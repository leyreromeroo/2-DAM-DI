import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CityResult, WeatherData, HourlyForecast, DailyForecast } from '../models/weather.model';
import { getMockWeather } from '../mocks/weather.mock';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private weatherDataSubject = new BehaviorSubject<WeatherData | null>(null);
    weatherData$ = this.weatherDataSubject.asObservable();

    private cityNameSubject = new BehaviorSubject<string>('');
    cityName$ = this.cityNameSubject.asObservable();
    private apiKey = environment.openWeatherApiKey;
    private apiUrl = environment.openWeatherApiUrl;
    private geoUrl = environment.openWeatherGeocodingUrl;

    constructor(private http: HttpClient) { }

    getWeather(lat: number, lon: number, lang: string = 'en'): Observable<WeatherData> {
        const weatherUrl = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${this.apiKey}`;
        const forecastUrl = `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${this.apiKey}`;

        return forkJoin({
            current: this.http.get<any>(weatherUrl),
            forecast: this.http.get<any>(forecastUrl)
        }).pipe(
            map(({ current, forecast }) => {
                const currentHourly: HourlyForecast = {
                    dt: current.dt,
                    temp: current.main.temp,
                    weather: current.weather,
                    pop: 0,
                    wind_speed: current.wind.speed,
                    wind_deg: current.wind.deg
                };

                return {
                    lat: current.coord.lat,
                    lon: current.coord.lon,
                    name: current.name,
                    current: {
                        temp: current.main.temp,
                        feels_like: current.main.feels_like,
                        humidity: current.main.humidity,
                        uvi: 0,
                        wind_speed: current.wind.speed,
                        wind_deg: current.wind.deg,
                        weather: current.weather,
                        dt: current.dt,
                        precipitation: 0
                    },
                    hourly: [currentHourly, ...this.processHourlyInterpolated(forecast.list.slice(0, 8))],
                    daily: this.processDaily(forecast.list)
                };
            })
        );
    }

    private processHourlyRaw(list: any[]): HourlyForecast[] {
        return list.map(item => ({
            dt: item.dt,
            temp: item.main.temp,
            weather: item.weather,
            pop: item.pop || 0,
            wind_speed: item.wind.speed,
            wind_deg: item.wind.deg
        }));
    }

    private processHourlyInterpolated(list: any[]): HourlyForecast[] {
        const result: HourlyForecast[] = [];

        // Take enough items to cover ~24h after interpolation (8 * 3 = 24h, so 8 items is fine)
        // But we need to look ahead, so let's process the whole list passed (usually 40 items) 
        // and slice later if needed, or simply process the slice passed in.

        const inputList = list;

        for (let i = 0; i < inputList.length - 1; i++) {
            const current = inputList[i];
            const next = inputList[i + 1];

            const currentDt = current.dt;
            const nextDt = next.dt;
            const timeDiff = nextDt - currentDt; // Should be 10800 (3 hours)

            // Add current item
            result.push({
                dt: current.dt,
                temp: current.main.temp,
                weather: current.weather,
                pop: current.pop || 0,
                wind_speed: current.wind.speed,
                wind_deg: current.wind.deg
            });

            // If gap is approx 3 hours, interpolate 2 intermediate hours
            if (timeDiff >= 10000 && timeDiff <= 11000) {
                for (let h = 1; h < 3; h++) {
                    const fraction = h / 3;
                    const interpDt = currentDt + (h * 3600);
                    const interpTemp = current.main.temp + (next.main.temp - current.main.temp) * fraction;

                    result.push({
                        dt: interpDt,
                        temp: Math.round(interpTemp * 10) / 10, // Round to 1 decimal
                        weather: current.weather, // Keep same icon for the interval
                        pop: current.pop || 0,
                        wind_speed: current.wind.speed,
                        wind_deg: current.wind.deg
                    });
                }
            }
        }

        // Add the very last item if needed, or just rely on the loop
        // The loop goes to length-1, so last item isn't added as "current".
        // Let's add the last item of input as is.
        if (inputList.length > 0) {
            const last = inputList[inputList.length - 1];
            result.push({
                dt: last.dt,
                temp: last.main.temp,
                weather: last.weather,
                pop: last.pop || 0,
                wind_speed: last.wind.speed,
                wind_deg: last.wind.deg
            });
        }

        return result;
    }

    private processDaily(list: any[]): DailyForecast[] {
        const dailyMap = new Map<string, any[]>();
        const sortedList = [...list].sort((a, b) => a.dt - b.dt);

        sortedList.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!dailyMap.has(date)) {
                dailyMap.set(date, []);
            }
            dailyMap.get(date)?.push(item);
        });

        const daily: DailyForecast[] = [];
        const dates = Array.from(dailyMap.keys());

        dates.forEach((date, index) => {
            const items = dailyMap.get(date) || [];

            // Try to find the first item of the NEXT day to complete the "midnight to midnight" cycle
            if (index < dates.length - 1) {
                const nextDate = dates[index + 1];
                const nextDayItems = dailyMap.get(nextDate);
                if (nextDayItems && nextDayItems.length > 0) {
                    // Add the first item of the next day (e.g., 00:00 or 01:00)
                    items.push(nextDayItems[0]);
                }
            }

            const min = Math.min(...items.map(i => i.main.temp_min));
            const max = Math.max(...items.map(i => i.main.temp_max));

            // Find item closest to noon for 'day' temp and icon
            // We use the original items list (without the next day's overlap) for determining the "day" icon/temp logic if strictly preferred, 
            // but usually the noon item falls well within the day anyway.
            const noonItem = items.reduce((prev, curr) => {
                return Math.abs(new Date(curr.dt * 1000).getHours() - 12) < Math.abs(new Date(prev.dt * 1000).getHours() - 12) ? curr : prev;
            });

            daily.push({
                dt: noonItem.dt,
                temp: {
                    day: noonItem.main.temp,
                    min: min,
                    max: max
                },
                weather: noonItem.weather,
                uvi: 0,
                pop: Math.max(...items.map(i => i.pop || 0)),
                hourly: this.processHourlyRaw(items)
            });
        });

        // The processed list usually keeps current day + 5 days. User wants current + 4 days.
        // Current day is usually index 0 if time is right, or if 'processHourly' covers 'hourly' view.
        // We will return all available days (usually 5 or 6 partial).
        // Let's return 5 days total.
        return daily.slice(0, 5);
    }

    setWeatherData(data: WeatherData) {
        this.weatherDataSubject.next(data);
    }

    setCityName(name: string) {
        this.cityNameSubject.next(name);
    }

    getCoordinatesByCity(city: string): Observable<CityResult[]> {
        const url = `${this.geoUrl}/direct?q=${city}&limit=5&appid=${this.apiKey}`;
        return this.http.get<CityResult[]>(url);
    }

    getCityByCoordinates(lat: number, lon: number): Observable<CityResult[]> {
        const url = `${this.geoUrl}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;
        return this.http.get<CityResult[]>(url);
    }

    getCurrentWeather(lat: number, lon: number): Observable<any> {
        const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
        return this.http.get<any>(url);
    }

    getSurroundingCities(lat: number, lon: number, cnt: number = 10): Observable<any> {
        // Use the 'find' endpoint to get data for cities in circle
        // Note: 'find' returns 2.5 weather data which includes feels_like
        const url = `${this.apiUrl}/find?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${this.apiKey}`;
        return this.http.get<any>(url);
    }

    getMockWeather(lang: string = 'es'): Observable<WeatherData> {
        return of(getMockWeather(lang));
    }
}
