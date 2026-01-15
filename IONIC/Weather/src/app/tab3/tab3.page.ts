import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
  IonNote
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { languageOutline, optionsOutline, informationCircleOutline, openOutline, heart, partlySunny } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonIcon,
    IonNote,
    TranslateModule
  ],
})
export class Tab3Page {
  constructor(private translate: TranslateService) {
    // Clean addIcons call with no duplicates
    addIcons({ partlySunny, languageOutline, optionsOutline, informationCircleOutline, openOutline, heart });
  }

  get currentLang(): string {
    return this.translate.currentLang || 'es';
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  isEn() {
    return this.currentLang === 'en';
  }

  toggleLanguage(event: any) {
    const lang = event.detail.checked ? 'en' : 'es';
    this.translate.use(lang);
  }
}
