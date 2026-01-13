import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote, IonIcon } from '@ionic/angular/standalone';
import { WeatherService } from '../core/services/weather.service';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherIconComponent } from '../shared/components/atoms/weather-icon/weather-icon.component';
import { TempDisplayComponent } from '../shared/components/atoms/temp-display/temp-display.component';
import { addIcons } from 'ionicons';
import { cloudOfflineOutline } from 'ionicons/icons';

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
    IonList,
    IonItem,
    IonNote,
    IonIcon,
    TranslateModule,
    WeatherIconComponent,
    TempDisplayComponent
  ]
})
export class Tab2Page {
  weather$ = this.weatherService.weatherData$;
  cityName$ = this.weatherService.cityName$;

  constructor(private weatherService: WeatherService) {
    addIcons({ 'cloud-offline-outline': cloudOfflineOutline });
  }
}
