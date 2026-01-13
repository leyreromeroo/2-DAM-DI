import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { WeatherPageTemplateComponent } from '../shared/components/templates/weather-page-template/weather-page-template.component';
import { SearchBarComponent } from '../shared/components/molecules/search-bar/search-bar.component';
import { CurrentWeatherCardComponent } from '../shared/components/organisms/current-weather-card/current-weather-card.component';
import { ForecastListComponent } from '../shared/components/organisms/forecast-list/forecast-list.component';
import { WeatherService } from '../core/services/weather.service';
import { GeolocationService } from '../core/services/geolocation.service';
import { WeatherData } from '../core/models/weather.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonSpinner,
    WeatherPageTemplateComponent,
    SearchBarComponent,
    CurrentWeatherCardComponent,
    ForecastListComponent
  ]
})
export class Tab1Page implements OnInit {
  weatherData?: WeatherData;
  cityName: string = '';
  loading: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private geoService: GeolocationService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getCurrentLocationWeather();

    this.translate.onLangChange.subscribe(() => {
      if (this.weatherData) {
        this.fetchWeather(this.weatherData.lat || 0, this.weatherData.lon || 0);
      } else {
        this.loadMockData('Language changed');
      }
    });
  }

  async getCurrentLocationWeather() {
    this.loading = true;
    try {
      const hasPermission = await this.geoService.checkPermissions();
      if (hasPermission) {
        const position = await this.geoService.getCurrentPosition();
        this.cityName = 'My Location'; // Or get from reverse geocoding if needed
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      }
    } catch (error) {
      console.error('Error getting location', error);
      // Fallback to a default city if location fails
      this.onSearch('Madrid');
    } finally {
      this.loading = false;
    }
  }

  onSearch(city: string | any) {
    const cityName = typeof city === 'string' ? city : city?.target?.value;
    if (!cityName || typeof cityName !== 'string' || !cityName.trim()) return;

    this.loading = true;
    this.weatherService.getCoordinatesByCity(cityName.trim()).subscribe({
      next: (results) => {
        if (results.length > 0) {
          const location = results[0];
          this.cityName = location.name;
          this.weatherService.setCityName(this.cityName);
          this.fetchWeather(location.lat, location.lon);
        } else {
          this.loadMockData('City not found, showing mock data');
        }
      },
      error: (err) => {
        console.error(err);
        this.loadMockData('API error, showing mock data');
      },
      complete: () => this.loading = false
    });
  }

  fetchWeather(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon, this.translate.currentLang).subscribe({
      next: (data) => {
        data.lat = lat;
        data.lon = lon;
        this.weatherData = data;
        this.weatherService.setWeatherData(data);
      },
      error: (err) => {
        console.error(err);
        this.loadMockData('API error, showing mock data');
      }
    });
  }

  loadMockData(reason: string) {
    console.warn(reason);
    this.cityName = this.cityName || 'Mock City';
    this.weatherService.setCityName(this.cityName);
    this.weatherService.getMockWeather(this.translate.currentLang).subscribe(data => {
      this.weatherData = data;
      this.weatherService.setWeatherData(data);
      this.loading = false;
    });
  }
}
