import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherIconComponent } from '../../atoms/weather-icon/weather-icon.component';
import { TempDisplayComponent } from '../../atoms/temp-display/temp-display.component';
import { WeatherDetailComponent } from '../../molecules/weather-detail/weather-detail.component';
import { WeatherData } from '../../../../core/models/weather.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-current-weather-card',
    standalone: true,
    imports: [
        CommonModule,
        WeatherIconComponent,
        TempDisplayComponent,
        WeatherDetailComponent,
        TranslateModule
    ],
    template: `
    <div class="card-container" *ngIf="weather">
      <div class="header">
        <h1 class="city">{{ cityName }}</h1>
        <p class="date">{{ weather.current.dt * 1000 | date:'EEEE, d MMMM' }}</p>
      </div>

      <div class="main-info">
        <app-weather-icon [condition]="weather.current.weather[0].main" size="6rem"></app-weather-icon>
        <div class="temp-section">
          <app-temp-display [temp]="weather.current.temp" size="large"></app-temp-display>
          <span class="description">{{ weather.current.weather[0].description }}</span>
        </div>
      </div>

      <div class="details-grid">
        <app-weather-detail 
          icon="water-outline" 
          label="HUMIDITY" 
          [value]="weather.current.humidity" 
          unit="%">
        </app-weather-detail>
        <app-weather-detail 
          icon="leaf-outline" 
          label="WIND" 
          [value]="weather.current.wind_speed" 
          unit=" km/h">
        </app-weather-detail>
        <app-weather-detail 
          icon="sunny-outline" 
          label="UV_INDEX" 
          [value]="weather.current.uvi">
        </app-weather-detail>
        <app-weather-detail 
          icon="rainy-outline" 
          label="FEELS_LIKE" 
          [value]="weather.current.feels_like" 
          unit="°">
        </app-weather-detail>
      </div>
    </div>
  `,
    styles: [`
    .card-container {
      padding: 20px;
      margin: 10px;
      background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%);
      backdrop-filter: blur(20px);
      border-radius: 30px;
      border: 1px solid rgba(255,255,255,0.5);
      box-shadow: 0 10px 25px rgba(0,0,0,0.03);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .city {
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0;
      color: #333;
    }
    .date {
      font-size: 0.9rem;
      color: #666;
      margin: 5px 0 0;
    }
    .main-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
    }
    .temp-section {
      text-align: center;
      margin-top: -10px;
    }
    .description {
      display: block;
      font-size: 1.2rem;
      text-transform: capitalize;
      color: #555;
      font-weight: 400;
      margin-top: -5px;
    }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  `]
})
export class CurrentWeatherCardComponent {
    @Input() weather?: WeatherData;
    @Input() cityName: string = '';
}
