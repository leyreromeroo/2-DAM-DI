import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherIconComponent } from '../../atoms/weather-icon/weather-icon.component';
import { TempDisplayComponent } from '../../atoms/temp-display/temp-display.component';
import { WeatherData } from '../../../../core/models/weather.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { IonSegment, IonSegmentButton, IonLabel, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

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
    IonLabel,
    IonIcon,
    IonButton
  ],
  template: `
    @if (weather) {
      <div class="forecast-container">
        <ion-segment [(ngModel)]="view" class="custom-segment">
          <ion-segment-button value="hourly">
            <ion-label>{{ 'HOURLY_FORECAST' | translate }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="daily">
            <ion-label>{{ 'FORECAST_4_DAYS' | translate }}</ion-label>
          </ion-segment-button>
        </ion-segment>

        @if (view === 'hourly') {
          <div class="scroll-wrapper">
            <ion-button fill="clear" class="scroll-btn left" (click)="scrollLeft()">
              <ion-icon name="chevron-back-outline" slot="icon-only"></ion-icon>
            </ion-button>

            <div class="scroll-container" #scrollContainer>
              <!-- SVG Graph Layer -->
              <svg class="chart-svg" [attr.width]="(weather.hourly.slice(0, 24).length * 80) + 'px'" height="150" style="overflow: visible;">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#3880ff" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#3880ff" stop-opacity="0.0" />
                  </linearGradient>
                </defs>
                <!-- Fill Path (Area) -->
                <path [attr.d]="fillPath" fill="url(#chartGradient)" stroke="none" />
                <!-- Line Path -->
                <path [attr.d]="chartPath" fill="none" stroke="#3880ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <!-- Points -->
                @for (point of chartPoints; track $index) {
                  <circle [attr.cx]="point.x" [attr.cy]="point.y" r="4" fill="white" stroke="#3880ff" stroke-width="2" />
                }
              </svg>

              @for (hour of weather.hourly.slice(0, 24); track hour.dt) {
                <div class="hourly-item">
                  <span class="time">{{ hour.dt * 1000 | date:'HH:mm':'':translate.currentLang }}</span>
                  <app-temp-display [temp]="hour.temp" size="medium" class="temp-text"></app-temp-display>
                  <div class="graph-spacer"></div>
                  <app-weather-icon [condition]="hour.weather[0].main" [code]="hour.weather[0].id" size="2rem"></app-weather-icon>
                </div>
              }
            </div>

            <ion-button fill="clear" class="scroll-btn right" (click)="scrollRight()">
              <ion-icon name="chevron-forward-outline" slot="icon-only"></ion-icon>
            </ion-button>
          </div>
        }

        @if (view === 'daily') {
          <div class="daily-list">
            @for (day of weather.daily.slice(1, 5); track day.dt) {
              <div class="daily-card">
                <div class="daily-summary">
                  <span class="day-name">{{ day.dt * 1000 | date:'EEEE':'':translate.currentLang }}</span>
                  <div class="day-info">
                    <app-weather-icon [condition]="day.weather[0].main" [code]="day.weather[0].id" size="2rem"></app-weather-icon>
                    <div class="temps">
                      <app-temp-display [temp]="day.temp.max" size="small"></app-temp-display>
                      <span class="divider">/</span>
                      <app-temp-display [temp]="day.temp.min" size="small" style="opacity: 0.6"></app-temp-display>
                    </div>
                  </div>
                </div>

                <div class="daily-hourly-wrapper">
                  <ion-button fill="clear" class="scroll-btn left" (click)="scrollElement(dailyScroll, -150)">
                    <ion-icon name="chevron-back-outline" slot="icon-only"></ion-icon>
                  </ion-button>

                  <div class="daily-hourly" #dailyScroll>
                    @for (h of day.hourly; track h.dt) {
                      <div class="mini-hourly-item">
                        <span class="mini-time">{{ h.dt * 1000 | date:'HH:mm':'':translate.currentLang }}</span>
                        <app-weather-icon [condition]="h.weather[0].main" [code]="h.weather[0].id" size="1.2rem"></app-weather-icon>
                        <app-temp-display [temp]="h.temp" size="small" class="mini-temp"></app-temp-display>
                      </div>
                    }
                  </div>

                  <ion-button fill="clear" class="scroll-btn right" (click)="scrollElement(dailyScroll, 150)">
                    <ion-icon name="chevron-forward-outline" slot="icon-only"></ion-icon>
                  </ion-button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .forecast-container {
      margin: 10px;
    }
    .custom-segment {
      --background: rgba(255, 255, 255, 0.3);
      border-radius: 15px;
      margin-bottom: 15px;
      backdrop-filter: blur(5px);
    }
    .scroll-wrapper {
      display: flex;
      align-items: center;
      position: relative;
    }
    .scroll-btn {
      --padding-start: 0;
      --padding-end: 0;
      height: 40px;
      width: 40px;
      margin: 0 -10px;
      z-index: 10;
      --color: #555;
      display: none;
    }
    .scroll-container {
      display: flex;
      overflow-x: auto;
      gap: 0;
      padding: 10px 0;
      scrollbar-width: none;
      scroll-behavior: smooth;
      width: 100%;
      position: relative;
    }
    .scroll-container::-webkit-scrollbar { display: none; }
    .chart-svg {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 0;
    }
    .hourly-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: transparent;
      padding: 10px 0;
      min-width: 80px;
      width: 80px;
      position: relative;
      z-index: 1;
    }
    .time {
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 5px;
      color: #555;
    }
    .temp-text {
      margin-bottom: 5px;
      display: block;
    }
    .graph-spacer {
      height: 70px;
      width: 100%;
    }
    .daily-hourly-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }
    .daily-hourly-wrapper .scroll-btn {
      display: none;
      margin: 0 -5px;
    }
    .daily-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      padding-right: 5px;
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .daily-list::-webkit-scrollbar { width: 6px; }
    .daily-list::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.1); border-radius: 3px; }
    .daily-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.3); border-radius: 3px; }
    .daily-list::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.5); }
    .daily-card {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(8px);
      transition: transform 0.2s;
    }
    .daily-card:active { transform: scale(0.99); }
    .daily-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
    }
    .daily-hourly {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 0 5px 15px;
      scrollbar-width: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: 5px;
      padding-top: 10px;
      flex: 1;
      scroll-behavior: smooth;
    }
    .daily-hourly::-webkit-scrollbar { display: none; }
    .mini-hourly-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 50px;
      gap: 3px;
    }
    .mini-time { font-size: 0.7rem; color: #666; }
    .mini-temp { transform: scale(0.8); font-weight: 600; }
    .day-name { font-weight: 600; text-transform: capitalize; color: #333; }
    .day-info { display: flex; align-items: center; gap: 15px; }
    .temps { display: flex; align-items: center; gap: 5px; min-width: 80px; justify-content: flex-end; }
    .divider { color: #999; font-size: 0.8rem; }
    @media(max-width: 768px) {
      .daily-list {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .daily-card {
        margin-bottom: 5px;
      }
      .daily-summary {
        flex-direction: row;
        align-items: center;
        padding: 15px 20px;
        gap: 0;
      }
      .day-name { font-size: 1rem; margin-bottom: 0; }
      .day-info {
        width: auto;
        justify-content: flex-end;
        gap: 15px;
      }
      .temps { font-size: 1rem; }
      .daily-hourly {
        padding: 0 15px 15px;
        gap: 10px;
      }
      .mini-hourly-item { min-width: 50px; }
    }
    ion-segment-button ion-label {
      white-space: normal!important;
      line-height: 1.2;
      font-size: 0.75rem;
      padding: 2px 0;
    }

    @media(min-width: 768px) {
      .scroll-container {
        justify-content: flex-start;
      }
      .scroll-btn, .daily-hourly-wrapper .scroll-btn {
        display: block;
      }
    }
  `]
})
export class ForecastListComponent implements OnChanges {
  @Input() weather?: WeatherData;
  view: 'hourly' | 'daily' = 'hourly';

  chartPath: string = '';
  fillPath: string = '';
  chartPoints: { x: number, y: number }[] = [];
  private readonly ITEM_WIDTH = 80;
  private readonly GRAPH_HEIGHT = 60;
  private readonly GRAPH_TOP_OFFSET = 90;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(public translate: TranslateService) {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weather'] && this.weather) {
      this.calculateGraph();
    }
  }

  calculateGraph() {
    if (!this.weather || !this.weather.hourly) return;

    const hours = this.weather.hourly.slice(0, 24);
    const temps = hours.map(h => h.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const range = maxTemp - minTemp || 1;

    // Calculate basic points
    const points = hours.map((h, i) => {
      const x = (i * this.ITEM_WIDTH) + (this.ITEM_WIDTH / 2);
      const normalizedTemp = (h.temp - minTemp) / range;
      const y = this.GRAPH_TOP_OFFSET + (this.GRAPH_HEIGHT * (1 - normalizedTemp));
      return { x, y };
    });

    this.chartPoints = points;

    // Generate Smooth Path (Cubic Bezier)
    if (points.length > 1) {
      let path = `M ${points[0].x} ${points[0].y} `;

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];

        const cp1x = p0.x + (p1.x - p0.x) / 2;
        const cp1y = p0.y;
        const cp2x = p1.x - (p1.x - p0.x) / 2;
        const cp2y = p1.y;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y} `;
      }
      this.chartPath = path;

      // Close the path for the fill
      const fillHeight = 150;
      this.fillPath = path + ` L ${points[points.length - 1].x} ${fillHeight} L ${points[0].x} ${fillHeight} Z`;
    }
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  scrollElement(element: HTMLElement, offset: number) {
    element.scrollBy({ left: offset, behavior: 'smooth' });
  }
}
