import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { ForecastListComponent } from '../forecast-list/forecast-list.component';
import { WeatherData } from '../../../../core/models/weather.model';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-forecast-modal',
    standalone: true,
    imports: [
        CommonModule,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        ForecastListComponent,
        TranslateModule
    ],
    template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ cityName }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <app-forecast-list [weather]="weather"></app-forecast-list>
    </ion-content>
  `
})
export class ForecastModalComponent {
    @Input() weather?: WeatherData;
    @Input() cityName: string = '';

    constructor(private modalCtrl: ModalController) {
        addIcons({ closeOutline });
    }

    close() {
        this.modalCtrl.dismiss();
    }
}
