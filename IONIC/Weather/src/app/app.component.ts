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
    this.translate.setDefaultLang('es');
    this.translate.use('es');

    // Set static proprietary title
    this.titleService.setTitle('WeatherApp');
  }

  // updateTitle removed as it is no longer needed for dynamic translation
}
