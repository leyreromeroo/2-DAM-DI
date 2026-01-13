import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.updateTitle();
    });
    // Set initial title
    this.updateTitle();
  }

  updateTitle() {
    this.translate.get('APP_TITLE').subscribe((res: string) => {
      // Only set the title if it's not the key itself
      if (res && res !== 'APP_TITLE') {
        this.titleService.setTitle(res);
      } else {
        // Fallback based on current language if translation not ready
        const fallback = this.translate.currentLang === 'es' ? 'Tiempo' : 'Weather';
        this.titleService.setTitle(fallback);
      }
    });
  }
}
