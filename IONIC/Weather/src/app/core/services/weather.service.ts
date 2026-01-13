import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CityResult, WeatherData } from '../models/weather.model';
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
        const url = `${this.apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=${lang}&appid=${this.apiKey}`;
        return this.http.get<WeatherData>(url);
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

    getMockWeather(lang: string = 'es'): Observable<WeatherData> {
        return of(getMockWeather(lang));
    }
}
