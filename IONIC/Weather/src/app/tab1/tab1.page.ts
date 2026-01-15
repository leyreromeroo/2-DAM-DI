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

    this.translate.onLangChange.subscribe((event) => {
      if (this.weatherData && this.weatherData.lat && this.weatherData.lon) {
        // Re-fetch weather with the new language
        this.fetchWeather(this.weatherData.lat, this.weatherData.lon, true);
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
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Try to get detailed city name first
        this.weatherService.getCityByCoordinates(lat, lon).subscribe({
          next: (results) => {
            let name = 'My Location';
            if (results && results.length > 0) {
              name = this.formatBilingualName(results[0]);
            }
            this.cityName = name;
            this.weatherService.setCityName(name);
            this.fetchWeather(lat, lon, true); // true = preserve current name
          },
          error: () => this.fetchWeather(lat, lon)
        });
      }
    } catch (error) {
      console.error('Error getting location', error);
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
          this.cityName = this.formatBilingualName(location);
          this.weatherService.setCityName(this.cityName);
          this.fetchWeather(location.lat, location.lon, true);
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

  fetchWeather(lat: number, lon: number, preserveName: boolean = false) {
    this.weatherService.getWeather(lat, lon, this.translate.currentLang).subscribe({
      next: (data) => {
        data.lat = lat;
        data.lon = lon;
        this.weatherData = data;

        if (!preserveName && data.name) {
          this.cityName = data.name;
          this.weatherService.setCityName(this.cityName);
        } else if (preserveName) {
          // Ensure data also carries the preserved name if needed by other components
          data.name = this.cityName;
        }

        this.weatherService.setWeatherData(data);
      },
      error: (err) => {
        console.error(err);
        this.loadMockData('API error, showing mock data');
      }
    });
  }

  private formatBilingualName(location: any): string {
    if (location.local_names) {
      const es = location.local_names.es;
      const eu = location.local_names.eu;
      if (es && eu && es !== eu) {
        return `${es} / ${eu}`;
      }
      if (es) return es;
      if (eu) return eu;
    }
    return location.name;
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
