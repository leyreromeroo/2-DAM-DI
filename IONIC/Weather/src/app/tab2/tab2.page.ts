import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { WeatherService } from '../core/services/weather.service';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherMapComponent } from '../shared/components/organisms/weather-map/weather-map.component'; // Import Map

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    TranslateModule,
    WeatherMapComponent
  ]
})
export class Tab2Page {
  weather$ = this.weatherService.weatherData$;

  constructor(private weatherService: WeatherService) { }
}
