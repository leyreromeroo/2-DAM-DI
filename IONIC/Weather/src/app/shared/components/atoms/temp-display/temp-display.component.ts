import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temp-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="temp-container" [ngClass]="sizeClass">
      <span class="value">{{ temp | number:'1.0-0' }}</span>
      <span class="unit">°</span>
    </span>
  `,
  styles: [`
    .temp-container {
      display: inline-flex;
      font-weight: 300;
      color: var(--ion-color-dark);
    }
    .value {
      font-family: inherit;
    }
    .unit {
      margin-left: 2px;
      font-weight: 400;
    }
    .large { font-size: 5rem; letter-spacing: -2px; }
    .medium { font-size: 2rem; }
    .small { font-size: 1.2rem; font-weight: 500; }
    .tiny { font-size: 0.9rem; font-weight: 600; }
  `]
})
export class TempDisplayComponent {
  @Input() temp: number = 0;
  @Input() size: 'tiny' | 'small' | 'medium' | 'large' = 'medium';

  get sizeClass(): string {
    return this.size;
  }
}
