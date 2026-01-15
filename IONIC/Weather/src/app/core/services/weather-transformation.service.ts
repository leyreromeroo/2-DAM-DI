import { Injectable } from '@angular/core';
import { DailyForecast, HourlyForecast, WeatherData } from '../models/weather.model';

@Injectable({
    providedIn: 'root'
})
export class WeatherTransformationService {

    constructor() { }

    mapToWeatherData(current: any, forecast: any): WeatherData {
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
                uvi: 0, // Not available in standard weather endpoint usually, would need OneCall
                wind_speed: current.wind.speed,
                wind_deg: current.wind.deg,
                weather: current.weather,
                dt: current.dt,
                precipitation: 0
            },
            hourly: [currentHourly, ...this.processHourlyInterpolated(forecast.list.slice(0, 8))],
            daily: this.processDaily(forecast.list)
        };
    }

    processHourlyRaw(list: any[]): HourlyForecast[] {
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
        const inputList = list;

        for (let i = 0; i < inputList.length - 1; i++) {
            const current = inputList[i];
            const next = inputList[i + 1];

            const currentDt = current.dt;
            const nextDt = next.dt;
            const timeDiff = nextDt - currentDt;

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
                        temp: Math.round(interpTemp * 10) / 10,
                        weather: current.weather,
                        pop: current.pop || 0,
                        wind_speed: current.wind.speed,
                        wind_deg: current.wind.deg
                    });
                }
            }
        }

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

            if (index < dates.length - 1) {
                const nextDate = dates[index + 1];
                const nextDayItems = dailyMap.get(nextDate);
                if (nextDayItems && nextDayItems.length > 0) {
                    items.push(nextDayItems[0]);
                }
            }

            const min = Math.min(...items.map(i => i.main.temp_min));
            const max = Math.max(...items.map(i => i.main.temp_max));

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

        return daily.slice(0, 5);
    }
}
