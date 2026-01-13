import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherIconComponent } from '../../atoms/weather-icon/weather-icon.component';
import { TempDisplayComponent } from '../../atoms/temp-display/temp-display.component';
import { WeatherData, HourlyForecast, DailyForecast } from '../../../../core/models/weather.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';

@Component({
    selector: 'app-forecast-list',
    standalone: true,
    imports: [
        CommonModule,
        WeatherIconComponent,
        TempDisplayComponent,
        TranslateModule,
        FormsModule,
        IonSegment,
        IonSegmentButton,
        IonLabel
    ],
    template: `
    <div class="forecast-container" *ngIf="weather">
      <ion-segment [(ngModel)]="view" class="custom-segment">
        <ion-segment-button value="hourly">
          <ion-label>{{ 'HOURLY_FORECAST' | translate }}</ion-label>
        </ion-segment-button>
        <ion-segment-button value="daily">
          <ion-label>{{ 'FORECAST_4_DAYS' | translate }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div class="scroll-container" *ngIf="view === 'hourly'">
        <div class="hourly-item" *ngFor="let hour of weather.hourly.slice(0, 24)">
          <span class="time">{{ hour.dt * 1000 | date:'HH:mm' }}</span>
          <app-weather-icon [condition]="hour.weather[0].main" size="2rem"></app-weather-icon>
          <app-temp-display [temp]="hour.temp" size="small"></app-temp-display>
        </div>
      </div>

      <div class="daily-list" *ngIf="view === 'daily'">
        <div class="daily-item" *ngFor="let day of weather.daily.slice(1, 5)">
          <span class="day-name">{{ day.dt * 1000 | date:'EEEE' }}</span>
          <div class="day-info">
            <app-weather-icon [condition]="day.weather[0].main" size="2rem"></app-weather-icon>
            <div class="temps">
              <app-temp-display [temp]="day.temp.max" size="small"></app-temp-display>
              <span class="divider">/</span>
              <app-temp-display [temp]="day.temp.min" size="small" style="opacity: 0.6"></app-temp-display>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .forecast-container {
      margin: 10px;
    }
    .custom-segment {
      --background: rgba(255, 255, 255, 0.3);
      border-radius: 15px;
      margin-bottom: 15px;
    }
    .scroll-container {
      display: flex;
      overflow-x: auto;
      gap: 15px;
      padding: 10px 5px;
      scrollbar-width: none;
    }
    .scroll-container::-webkit-scrollbar { display: none; }
    
    .hourly-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.4);
      padding: 12px 18px;
      border-radius: 20px;
      min-width: 70px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.02);
    }
    .time {
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 5px;
      color: #666;
    }
    
    .daily-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .daily-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 20px;
    }
    .day-name {
      font-weight: 600;
      text-transform: capitalize;
      color: #333;
    }
    .day-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .temps {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 80px;
      justify-content: flex-end;
    }
    .divider {
      color: #999;
      font-size: 0.8rem;
    }
  `]
})
export class ForecastListComponent {
    @Input() weather?: WeatherData;
    view: 'hourly' | 'daily' = 'hourly';
}
