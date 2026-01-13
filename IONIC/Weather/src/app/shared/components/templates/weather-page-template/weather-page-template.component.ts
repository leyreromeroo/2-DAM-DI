import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-page-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-layout">
      <div class="header">
        <ng-content select="[header]"></ng-content>
      </div>
      
      <div class="content-wrapper">
        <div class="main-column">
          <ng-content select="[current]"></ng-content>
        </div>
        
        <div class="forecast-column">
          <ng-content select="[forecast]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-layout {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
      overflow-y: auto;
    }
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    /* Responsive layout for Web */
    @media (min-width: 768px) {
      .content-wrapper {
        flex-direction: row;
        padding: 40px 20px;
        max-width: 1100px;
        margin: 0 auto;
        gap: 30px;
        justify-content: center;
      }
      .main-column {
        flex: 1.2;
        max-width: 500px;
      }
      .forecast-column {
        flex: 1;
        max-width: 400px;
      }
    }
  `]
})
export class WeatherPageTemplateComponent { }
