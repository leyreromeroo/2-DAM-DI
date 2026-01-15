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
      width: 100%;
      z-index: 100;
      /* position: sticky removed to scroll with content */
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    /* Responsive layout for Web */
    @media (min-width: 900px) {
      .content-wrapper {
        flex-direction: row;
        padding: 40px;
        max-width: 1400px;
        margin: 0 auto;
        gap: 40px;
        justify-content: center;
        align-items: flex-start;
      }
      .main-column {
        flex: 1;
        max-width: 480px;
        position: sticky;
        top: 100px;
      }
      .forecast-column {
        flex: 1.5;
        max-width: 650px;
        /* Remove padding bottom since internal list handles scroll now if needed, 
           but keep some for safety */
        padding-bottom: 20px; 
      }
    }
  `]
})
export class WeatherPageTemplateComponent { }
