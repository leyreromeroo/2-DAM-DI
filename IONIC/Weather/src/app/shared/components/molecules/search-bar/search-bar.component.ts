import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, locationOutline } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageToggleComponent } from '../../atoms/language-toggle/language-toggle.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonSearchbar,
    IonIcon,
    IonButton,
    TranslateModule,
    LanguageToggleComponent
  ],
  template: `
    <div class="top-bar">
      <div class="search-container">
        <ion-searchbar 
          [placeholder]="'SEARCH_CITY' | translate" 
          [(ngModel)]="searchQuery"
          (ionChange)="onSearch()"
          (keyup.enter)="onSearch()"
          animated="true"
          class="custom-search">
        </ion-searchbar>
        <ion-button fill="clear" (click)="onLocationClick()" class="location-btn">
          <ion-icon slot="icon-only" name="location-outline"></ion-icon>
        </ion-button>
      </div>
      <app-language-toggle></app-language-toggle>
    </div>
  `,
  styles: [`
    .top-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 10px; /* Reduced padding */
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    .search-container {
      display: flex;
      align-items: center;
      flex: 1;
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(15px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 2px 10px rgba(0,0,0,0.03); /* Lighter shadow */
      height: 48px; /* Force slightly smaller height */
    }
    .custom-search {
      --background: transparent;
      --box-shadow: none;
      --border-radius: 15px;
      padding-top: 0;
      padding-bottom: 0;
      flex: 1;
      height: 100%;
    }
    .location-btn {
      --color: var(--ion-color-primary-shade);
      margin-right: 5px;
    }
  `]
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  @Output() location = new EventEmitter<void>();

  searchQuery: string = '';

  constructor() {
    addIcons({
      'search': search,
      'location-outline': locationOutline
    });
  }

  onSearch() {
    const query = typeof this.searchQuery === 'string' ? this.searchQuery : (this.searchQuery as any)?.target?.value;
    if (query && query.trim()) {
      this.search.emit(query.trim());
    }
  }

  onLocationClick() {
    this.location.emit();
  }
}
