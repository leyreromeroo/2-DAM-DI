import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CityResult } from '../models/weather.model';

@Injectable({
    providedIn: 'root'
})
export class WeatherApiService {
    private apiKey = environment.openWeatherApiKey;
    private apiUrl = environment.openWeatherApiUrl;
    private geoUrl = environment.openWeatherGeocodingUrl;

    constructor(private http: HttpClient) { }

    getWeatherRaw(lat: number, lon: number, lang: string = 'en'): Observable<any> {
        const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${this.apiKey}`;
        return this.http.get<any>(url);
    }

    getForecastRaw(lat: number, lon: number, lang: string = 'en'): Observable<any> {
        const url = `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${this.apiKey}`;
        return this.http.get<any>(url);
    }

    getDirectGeocoding(city: string, limit: number = 5): Observable<CityResult[]> {
        const url = `${this.geoUrl}/direct?q=${city}&limit=${limit}&appid=${this.apiKey}`;
        return this.http.get<CityResult[]>(url);
    }

    getReverseGeocoding(lat: number, lon: number, limit: number = 1): Observable<CityResult[]> {
        const url = `${this.geoUrl}/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${this.apiKey}`;
        return this.http.get<CityResult[]>(url);
    }

    getFindCities(lat: number, lon: number, cnt: number = 10): Observable<any> {
        const url = `${this.apiUrl}/find?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${this.apiKey}`;
        return this.http.get<any>(url);
    }
}
