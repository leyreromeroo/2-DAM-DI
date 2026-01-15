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
    <div class="icon-container" [ngClass]="weatherClass" [class.animated]="animated">
      <ion-icon [name]="iconName" [style.color]="iconColor" [style.font-size]="size"></ion-icon>
    </div>
  `,
  styles: [`
    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .animated {
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `]
})
export class WeatherIconComponent {
  @Input() condition: string = '';
  @Input() code?: number;
  @Input() size: string = '3rem';
  @Input() animated: boolean = false;

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
    if (this.code) {
      const id = this.code;
      if (id >= 200 && id < 300) return 'thunderstorm';
      if (id >= 300 && id < 600) return 'rainy';
      if (id >= 600 && id < 700) return 'snow';
      if (id >= 700 && id < 800) return 'cloudy'; // Atmosphere (fog, etc)
      if (id === 800) return 'sunny';
      if (id === 801 || id === 802) return 'partly-sunny';
      if (id >= 803) return 'cloudy';
    }

    // Fallback for string matching
    const cond = this.condition.toLowerCase();
    if (cond.includes('clear')) return 'sunny';
    if (cond.includes('cloud')) return 'partly-sunny';
    if (cond.includes('rain')) return 'rainy';
    if (cond.includes('snow')) return 'snow';
    if (cond.includes('storm')) return 'thunderstorm';
    return 'cloudy';
  }

  get iconColor(): string {
    let type = '';

    if (this.code) {
      const id = this.code;
      if (id >= 200 && id < 300) type = 'storm';
      else if (id >= 300 && id < 600) type = 'rain';
      else if (id >= 600 && id < 700) type = 'snow';
      else if (id >= 700 && id < 800) type = 'fog';
      else if (id === 800) type = 'clear';
      else if (id > 800) type = 'cloud';
    } else {
      const cond = this.condition.toLowerCase();
      if (cond.includes('clear')) type = 'clear';
      else if (cond.includes('cloud')) type = 'cloud';
      else if (cond.includes('rain')) type = 'rain';
      else if (cond.includes('snow')) type = 'snow';
      else if (cond.includes('storm')) type = 'storm';
    }

    switch (type) {
      case 'clear': return '#FFD700'; // Pastel Gold
      case 'cloud': return '#ADD8E6'; // Light Blue
      case 'rain': return '#6495ED'; // Cornflower Blue
      case 'snow': return '#A4C6E9'; // Visible cool blue for snow
      case 'storm': return '#778899'; // Light Slate Gray
      case 'fog': return '#B0C4DE'; // Light Steel Blue
      default: return '#B0C4DE';
    }
  }

  get weatherClass(): string {
    return this.condition.toLowerCase().replace(' ', '-');
  }
}
