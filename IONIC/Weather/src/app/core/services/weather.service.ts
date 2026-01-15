import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityResult, WeatherData } from '../models/weather.model';
import { WeatherApiService } from './weather-api.service';
import { WeatherTransformationService } from './weather-transformation.service';
import { getMockWeather } from '../mocks/weather.mock';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private weatherDataSubject = new BehaviorSubject<WeatherData | null>(null);
    weatherData$ = this.weatherDataSubject.asObservable();

    private cityNameSubject = new BehaviorSubject<string>('');
    cityName$ = this.cityNameSubject.asObservable();

    constructor(
        private weatherApi: WeatherApiService,
        private weatherTransform: WeatherTransformationService
    ) { }

    getWeather(lat: number, lon: number, lang: string = 'en'): Observable<WeatherData> {
        return forkJoin({
            current: this.weatherApi.getWeatherRaw(lat, lon, lang),
            forecast: this.weatherApi.getForecastRaw(lat, lon, lang)
        }).pipe(
            map(({ current, forecast }) => {
                return this.weatherTransform.mapToWeatherData(current, forecast);
            })
        );
    }

    setWeatherData(data: WeatherData) {
        this.weatherDataSubject.next(data);
    }

    setCityName(name: string) {
        this.cityNameSubject.next(name);
    }

    getCoordinatesByCity(city: string): Observable<CityResult[]> {
        return this.weatherApi.getDirectGeocoding(city);
    }

    getCityByCoordinates(lat: number, lon: number): Observable<CityResult[]> {
        return this.weatherApi.getReverseGeocoding(lat, lon);
    }

    getCurrentWeather(lat: number, lon: number): Observable<any> {
        return this.weatherApi.getWeatherRaw(lat, lon);
    }

    getSurroundingCities(lat: number, lon: number, cnt: number = 10): Observable<any> {
        return this.weatherApi.getFindCities(lat, lon, cnt);
    }

    getMockWeather(lang: string = 'es'): Observable<WeatherData> {
        return of(getMockWeather(lang));
    }
}
