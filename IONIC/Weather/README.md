# Weather is Sweet (El Tiempo es Dulce) 🌦️

A minimalist, "coqueto" weather application built with Ionic, Angular, and OpenWeather API.

## Features
- **Atomic Design**: Organized into Atoms, Molecules, Organisms, and Templates.
- **SOLID Architecture**: Refactored codebase with a strong focus on Single Responsibility Principle (SRP).
- **Modern UI**: Clean, pastel-colored design with smooth transitions and glassmorphism.
- **Search & Geolocation**: Search for any city or use your current location.
- **Interactive Map**: View weather conditions on a dynamic map.
- **Multi-language**: Fully localized in English and Spanish.
- **Responsive**: Optimized for both Android and Web.
- **Comprehensive Data**:
    - Current weather details (Temp, Wind, UV Index, Humidity, etc.)
    - Hourly forecast for the next 24 hours.
    - 5-day daily forecast.

## Technical Stack
- **Framework**: Ionic Framework (Standalone Components)
- **Core**: Angular with SOLID Principles
- **API**: OpenWeather (One Call 3.0, Geocoding)
- **i18n**: @ngx-translate/core
- **Icons**: Ionicons

### Architecture (SOLID)
The application follows a strict separation of concerns:
- **`WeatherApiService`**: Handles all HTTP communication with OpenWeatherMap.
- **`WeatherTransformationService`**: Pure logic service for transforming raw JSON into application models (`WeatherData`).
- **`WeatherService`**: State management and orchestration facade.
- **`GeolocationService`**: Manages device permissions and coordinates.

## Setup for Developers
1. **Clone the repository**:
   ```bash
   git clone [repo-url]
   cd Weather
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure API Key**:
   Open `src/environments/environment.ts` and replace `YOUR_API_KEY_HERE` with your OpenWeather API Key.
   > [!IMPORTANT]
   > Ensure your API key has access to the **One Call 3.0** endpoint.

4. **Run the app**:
   ```bash
   ionic serve
   ```

## Design System (Atomic Design)
- **Atoms**: `weather-icon`, `temp-display`
- **Molecules**: `search-bar`, `weather-detail`
- **Organisms**: `current-weather-card`, `forecast-list`, `weather-map`
- **Templates**: `weather-page-template`

## Screenshots
The design mockup is available in the repository root as `weather_app_design_mockup.png`.
