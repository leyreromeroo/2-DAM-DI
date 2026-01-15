import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { WeatherData } from '../../../../core/models/weather.model';
import { WeatherService } from '../../../../core/services/weather.service';
import { ModalController } from '@ionic/angular/standalone';
import { ForecastModalComponent } from '../forecast-modal/forecast-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weather-map',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="map-container">
      <div class="map-frame">
        <div id="map" #mapElement></div>
      </div>
      <div class="legend">
        <div class="legend-item"><span class="dot" style="background: #eb6e4b"></span> {{ 'MAP_LEGEND_FEELS_LIKE' | translate }}</div>
        <div class="legend-item"><span class="dot" style="background: #333"></span> {{ 'MAP_LEGEND_SELECTION' | translate }}</div>
      </div>
    </div>
  `,
  styles: [`
    .map-container {
      position: relative;
      height: 100%;
      width: 100%;
      /* removed min-height to allow full flex on mobile */
      display: flex;
      flex-direction: column;
    }

    @media (max-width: 768px) {
        .map-container {
            height: 100vh; /* Occupy full viewport height on mobile */
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
        }
        .map-frame {
             border-radius: 0; /* Remove radius for full screen effect */
             border: none;
        }
    }
    
    .map-frame {
      flex: 1;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border: 4px solid rgba(255,255,255,0.5);
      position: relative;
      z-index: 1;
    }
    /* ... rest of styles ... */
    #map {
      height: 100%;
      width: 100%;
      background: #f0f0f0;
    }

    .legend {
      position: absolute;
      bottom: 80px; /* Moves up on mobile to avoid tabs if needed, or stick to bottom */
      left: 20px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      padding: 8px 15px;
      border-radius: 20px;
      display: flex;
      gap: 15px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #555;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: block;
    }
  `]
})
export class WeatherMapComponent implements AfterViewInit, OnChanges {
  @Input() weather?: WeatherData;
  @ViewChild('mapElement') mapElement!: ElementRef;

  // Capitals of Autonomous Communities in Spain
  private readonly REGIONAL_CAPITALS = [
    { name: 'Santiago de Compostela', lat: 42.8782, lon: -8.5448 }, // Galicia
    { name: 'Oviedo', lat: 43.3614, lon: -5.8593 }, // Asturias
    { name: 'Santander', lat: 43.4623, lon: -3.8099 }, // Cantabria
    { name: 'Vitoria-Gasteiz', lat: 42.8467, lon: -2.6716 }, // País Vasco
    { name: 'Pamplona', lat: 42.8125, lon: -1.6457 }, // Navarra
    { name: 'Logroño', lat: 42.4623, lon: -2.4437 }, // La Rioja
    { name: 'Zaragoza', lat: 41.6488, lon: -0.8890 }, // Aragón
    { name: 'Barcelona', lat: 41.3851, lon: 2.1734 }, // Cataluña
    { name: 'Valencia', lat: 39.4699, lon: -0.3763 }, // C. Valenciana
    { name: 'Murcia', lat: 37.9922, lon: -1.1306 }, // Murcia
    { name: 'Sevilla', lat: 37.3891, lon: -5.9845 }, // Andalucía
    { name: 'Mérida', lat: 38.9161, lon: -6.3437 }, // Extremadura
    { name: 'Toledo', lat: 39.8628, lon: -4.0273 }, // Castilla-La Mancha
    { name: 'Valladolid', lat: 41.6522, lon: -4.7245 }, // Castilla y León
    { name: 'Madrid', lat: 40.4168, lon: -3.7038 }, // Madrid
    { name: 'Palma', lat: 39.5696, lon: 2.6501 }, // Baleares
    { name: 'Las Palmas', lat: 28.1235, lon: -15.4362 }, // Canarias 1
    { name: 'Santa Cruz de Tenerife', lat: 28.4636, lon: -16.2518 } // Canarias 2
  ];

  private map?: L.Map;
  private marker?: L.Marker;
  private surroundingMarkers: L.Marker[] = [];

  constructor(private weatherService: WeatherService, private modalCtrl: ModalController) { }

  ngAfterViewInit() {
    this.initMap();
    this.loadRegionalCapitals(); // Load these once on startup
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weather'] && this.weather && this.map) {
      this.updateMap();
    }
  }

  private initMap() {
    // Default to a central view if no weather data yet
    const lat = this.weather?.lat ?? 40.4168; // Madrid default
    const lon = this.weather?.lon ?? -3.7038;

    this.map = L.map(this.mapElement.nativeElement, {
      center: [lat, lon],
      zoom: 6, // Zoom out to see more of Spain by default
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    if (this.weather) {
      this.updateMap();
    }

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

  private updateMap() {
    if (!this.map || !this.weather || this.weather.lat === undefined || this.weather.lon === undefined) return;

    const lat = this.weather.lat!;
    const lon = this.weather.lon!;

    this.map.setView([lat, lon], 8);

    // Main Location Marker
    const temp = this.weather.current ? Math.round(this.weather.current.temp) : '--';
    const condition = this.weather.current && this.weather.current.weather[0] ? this.weather.current.weather[0].main : '';

    const customIcon = this.createMarkerIcon(temp, condition, true);

    if (this.marker) {
      this.marker.setLatLng([lat, lon]);
      this.marker.setIcon(customIcon);
    } else {
      this.marker = L.marker([lat, lon], { icon: customIcon }).addTo(this.map);
      this.marker.on('click', () => {
        this.openForecastModal(this.weather!); // Use existing data for main
      });
    }

    // Load surroundings for the specific location
    this.loadSurroundingCities(lat, lon);
  }

  private loadRegionalCapitals() {
    // Load static regional capitals
    this.REGIONAL_CAPITALS.forEach(city => {
      this.weatherService.getCurrentWeather(city.lat, city.lon).subscribe(data => {
        if (!this.map) return;

        const feelsLike = Math.round(data.main.feels_like);
        // Use visual differentiation (maybe slightly different color or just ST style)
        const icon = this.createMarkerIcon(feelsLike, 'ST', false);

        const marker = L.marker([city.lat, city.lon], { icon }).addTo(this.map!);
        marker.on('click', () => {
          this.fetchAndShowForecast(city.lat, city.lon, city.name);
        });
      });
    });
  }

  private loadSurroundingCities(lat: number, lon: number) {
    if (!this.map) return;

    // Clear existing markers
    this.surroundingMarkers.forEach(m => m.remove());
    this.surroundingMarkers = [];

    this.weatherService.getSurroundingCities(lat, lon, 15).subscribe(data => {
      if (!this.map || !data.list) return;

      data.list.forEach((city: any) => {
        // Skip if it's basically the main location
        if (Math.abs(city.coord.lat - lat) < 0.01 && Math.abs(city.coord.lon - lon) < 0.01) return;

        const feelsLike = Math.round(city.main.feels_like);
        const icon = this.createMarkerIcon(feelsLike, 'ST', false);

        const marker = L.marker([city.coord.lat, city.coord.lon], { icon }).addTo(this.map!);

        // Click event to open forecast
        marker.on('click', () => {
          this.fetchAndShowForecast(city.coord.lat, city.coord.lon, city.name);
        });

        this.surroundingMarkers.push(marker);
      });
    });
  }

  private fetchAndShowForecast(lat: number, lon: number, cityName: string) {
    this.weatherService.getWeather(lat, lon).subscribe(weatherData => {
      this.openForecastModal(weatherData);
    });
  }

  private async openForecastModal(weatherData: WeatherData) {
    const modal = await this.modalCtrl.create({
      component: ForecastModalComponent,
      componentProps: {
        weather: weatherData,
        cityName: weatherData.name
      }
    });
    await modal.present();
  }

  private createMarkerIcon(value: number | string, label: string, isMain: boolean) {
    // User requested "No pill", just the zone.
    // We will use the mini style for everything, or distinct color for main.
    // If isMain, maybe we just show a slightly different color mini-marker or just a dot.

    const isSelected = isMain;
    const bgColor = isSelected ? 'rgba(50, 50, 50, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    const textColor = isSelected ? '#fff' : '#eb6e4b';
    const borderColor = isSelected ? 'rgba(0,0,0,0.2)' : 'rgba(235, 110, 75, 0.3)';
    const labelColor = isSelected ? '#ccc' : '#999';

    if (isMain) {
      // Minimalist marker for main location (Just a clean point with temp)
      return L.divIcon({
        className: 'custom-weather-marker-main',
        html: `
          <div style="
            background: ${bgColor}; 
            padding: 6px 12px; 
            border-radius: 15px; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.2); 
            font-size: 14px; 
            font-weight: 700; 
            color: ${textColor};
            border: 1px solid ${borderColor};
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
          ">
            <span>${value}°</span>
          </div>
        `,
        iconSize: [50, 36],
        iconAnchor: [25, 18]
      });
    }

    // Surrounding markers (Feels Like)
    return L.divIcon({
      className: 'custom-weather-marker-mini',
      html: `
        <div style="
          background: rgba(255, 255, 255, 0.9); 
          padding: 6px 10px; 
          border-radius: 12px; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
          font-size: 13px; 
          font-weight: 700; 
          color: #eb6e4b;
          border: 1px solid rgba(235, 110, 75, 0.3);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
        ">
          <span>${value}°</span>
          <span style="font-size: 9px; color: #999; margin-top:2px;">ST</span>
        </div>
      `,
      iconSize: [46, 36],
      iconAnchor: [23, 18]
    });
  }
}
