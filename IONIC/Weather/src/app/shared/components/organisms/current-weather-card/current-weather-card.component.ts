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
        <app-weather-icon [condition]="weather.current.weather[0].main" [code]="weather.current.weather[0].id" size="6rem" [animated]="true"></app-weather-icon>
        <div class="temp-section">
          <app-temp-display [temp]="weather.current.temp" size="large"></app-temp-display>
          <span class="description">{{ weather.current.weather[0].description }}</span>
          
          <div class="high-low" *ngIf="weather.daily && weather.daily[0]">
            <span class="label">Max</span>
            <app-temp-display [temp]="weather.daily[0].temp.max" size="small"></app-temp-display>
            <span class="divider"></span>
            <span class="label">Min</span>
            <app-temp-display [temp]="weather.daily[0].temp.min" size="small" style="opacity: 0.7"></app-temp-display>
          </div>
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
      padding: 25px;
      margin: 15px;
      /* More substantial glass effect */
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      border-radius: 35px;
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 15px 35px rgba(0, 50, 100, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 25px;
    }
    .city {
      font-size: 2rem;
      font-weight: 800;
      margin: 0;
      letter-spacing: -0.5px;
      color: #1a1a1a;
      background: linear-gradient(45deg, #1a1a1a, #4a4a4a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .date {
      font-size: 0.85rem;
      color: #666;
      margin: 8px 0 0;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }
    .main-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 35px;
      position: relative;
    }
    .temp-section {
      text-align: center;
      margin-top: -10px;
    }
    /* We assume app-temp-display handles the font size of the number, 
       but we can target it deeply or just let it be. 
       Let's style the description nicely. */
    .description {
      display: inline-block;
      font-size: 1.1rem;
      text-transform: capitalize;
      color: #444;
      font-weight: 500;
      margin-top: 5px;
      padding: 6px 16px;
      background: rgba(255,255,255,0.5);
      border-radius: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    }
    .high-low {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
    }
    .label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #555;
      text-transform: uppercase;
      margin-right: 2px;
    }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
  `]
})
export class CurrentWeatherCardComponent {
  @Input() weather?: WeatherData;
  @Input() cityName: string = '';
}
