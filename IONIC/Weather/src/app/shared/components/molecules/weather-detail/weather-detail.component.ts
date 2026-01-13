import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { waterOutline, leafOutline, rainyOutline, sunnyOutline } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  imports: [CommonModule, IonIcon, IonLabel, TranslateModule],
  template: `
    <div class="detail-item">
      <div class="icon-bg">
        <ion-icon [name]="icon"></ion-icon>
      </div>
      <div class="info">
        <ion-label class="label">{{ label | translate }}</ion-label>
        <ion-label class="value">{{ value }}{{ unit }}</ion-label>
      </div>
    </div>
  `,
  styles: [`
    .detail-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      flex: 1;
      min-width: 140px;
    }
    .icon-bg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--ion-color-light);
      border-radius: 12px;
      font-size: 1.5rem;
      color: var(--ion-color-primary);
    }
    .info {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-size: 0.8rem;
      color: #7a7a7a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }
  `]
})
export class WeatherDetailComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() unit: string = '';

  constructor() {
    addIcons({
      'water-outline': waterOutline,
      'leaf-outline': leafOutline,
      'rainy-outline': rainyOutline,
      'sunny-outline': sunnyOutline
    });
  }
}
