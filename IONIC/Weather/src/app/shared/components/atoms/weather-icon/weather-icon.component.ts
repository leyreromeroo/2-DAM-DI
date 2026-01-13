import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunny, cloudy, rainy, snow, sunnyOutline, partlySunny, thunderstorm, water } from 'ionicons/icons';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
    <div class="icon-container" [ngClass]="weatherClass">
      <ion-icon [name]="iconName" [style.color]="iconColor" [style.font-size]="size"></ion-icon>
    </div>
  `,
  styles: [`
    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class WeatherIconComponent {
  @Input() condition: string = '';
  @Input() size: string = '3rem';

  constructor() {
    addIcons({
      'sunny': sunny,
      'cloudy': cloudy,
      'rainy': rainy,
      'snow': snow,
      'sunny-outline': sunnyOutline,
      'partly-sunny': partlySunny,
      'thunderstorm': thunderstorm,
      'water': water
    });
  }

  get iconName(): string {
    const cond = this.condition.toLowerCase();
    if (cond.includes('clear')) return 'sunny';
    if (cond.includes('cloud')) return 'partly-sunny';
    if (cond.includes('rain')) return 'rainy';
    if (cond.includes('snow')) return 'snow';
    if (cond.includes('storm')) return 'thunderstorm';
    return 'cloudy';
  }

  get iconColor(): string {
    const cond = this.condition.toLowerCase();
    if (cond.includes('clear')) return '#FFD700'; // Pastel Gold
    if (cond.includes('cloud')) return '#ADD8E6'; // Light Blue
    if (cond.includes('rain')) return '#6495ED'; // Cornflower Blue
    if (cond.includes('snow')) return '#F0F8FF'; // Alice Blue
    if (cond.includes('storm')) return '#778899'; // Light Slate Gray
    return '#B0C4DE'; // Light Steel Blue
  }

  get weatherClass(): string {
    return this.condition.toLowerCase().replace(' ', '-');
  }
}
