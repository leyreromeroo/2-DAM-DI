import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language-toggle',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toggle-container" (click)="toggleLanguage()">
      <span [class.active]="currentLang === 'es'">ES</span>
      <span class="divider">|</span>
      <span [class.active]="currentLang === 'en'">EN</span>
    </div>
  `,
    styles: [`
    .toggle-container {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.8rem;
      color: #777;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.8);
      user-select: none;
    }
    .toggle-container:hover {
      background: rgba(255, 255, 255, 0.8);
    }
    .active {
      color: #f4a261;
    }
    .divider {
      color: #ccc;
    }
  `]
})
export class LanguageToggleComponent {
    constructor(private translate: TranslateService) { }

    get currentLang(): string {
        return this.translate.currentLang || 'es';
    }

    toggleLanguage() {
        const nextLang = this.currentLang === 'es' ? 'en' : 'es';
        this.translate.use(nextLang);
    }
}
