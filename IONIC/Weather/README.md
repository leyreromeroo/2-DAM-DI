# Weather is Sweet (El Tiempo es Dulce)

Una aplicacion meteorologica minimalista y elegante construida con Ionic, Angular y la API de OpenWeather.

## Funcionalidades
- Diseno Atomico: Organizado en Atomos, Moleculas, Organismos y Plantillas.
- Arquitectura SOLID: Codigo refactorizado siguiendo el Principio de Responsabilidad Unica (SRP).
- Interfaz Moderna: Diseno limpio con tonos pastel, transiciones suaves y efectos de glassmorphism.
- Busqueda y Geolocalizacion: Busqueda por nombre de ciudad o mediante la ubicacion actual del dispositivo.
- Mapa Interactivo: Visualizacion dinamica de las condiciones climaticas en un mapa.
- Multi-idioma: Localizacion completa en Inglés y Castellano.
- Adaptable: Optimizado para funcionamiento en Android y Web.
- Datos Detallados:
    - Informacion actual (Temperatura, Viento, Indice UV, Humedad, etc.).
    - Prediccion por horas para las proximas 24 horas (con grafico visual).
    - Prediccion diaria para 5 dias (incluyendo el actual).

## Stack Tecnico
- Framework: Ionic Framework (Componentes Standalone)
- Nucleo: Angular con principios SOLID
- API: OpenWeather (One Call 3.0, Geocoding)
- i18n: @ngx-translate/core
- Iconos: Ionicons

### Arquitectura (SOLID)
La aplicacion sigue una separacion estricta de responsabilidades:
- WeatherApiService: Gestiona exclusivamente la comunicacion HTTP con OpenWeatherMap.
- WeatherTransformationService: Servicio de logica pura para transformar el JSON crudo en los modelos de la aplicacion (WeatherData).
- WeatherService: Fachada para la gestion de estado y orquestacion entre servicios.
- GeolocationService: Gestiona permisos y coordenadas del dispositivo.

## Configuracion para Desarrolladores
1. Clonar el repositorio:
   git clone [url-del-repo]
   cd Weather
2. Instalar dependencias:
   npm install
3. Configurar la Clave de API:
   Abrir src/environments/environment.ts y reemplazar 'YOUR_API_KEY_HERE' con su clave de OpenWeather API.
   Importante: Asegurese de que su clave tenga acceso al endpoint One Call 3.0.
4. Ejecutar la aplicacion:
   ionic serve

## Sistema de Diseno (Diseno Atomico)
- Atomos: weather-icon, temp-display
- Moleculas: search-bar, weather-detail
- Organismos: current-weather-card, forecast-list, weather-map
- Plantillas: weather-page-template

## Capturas de Pantalla
![Diseno Mockup](./weather_app_design_mockup.png)
El diseno previo de la herramienta se encuentra en la raiz del repositorio como weather_app_design_mockup.png.
