export interface WeatherData {
    name?: string;
    lat?: number;
    lon?: number;
    current: CurrentWeather;
    hourly: HourlyForecast[];
    daily: DailyForecast[];
}

export interface CurrentWeather {
    temp: number;
    feels_like: number;
    humidity: number;
    uvi: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
    dt: number;
    precipitation?: number;
}

export interface HourlyForecast {
    dt: number;
    temp: number;
    weather: WeatherCondition[];
    pop: number; // Probability of precipitation
    wind_speed: number;
    wind_deg: number;
}

export interface DailyForecast {
    dt: number;
    temp: {
        day: number;
        min: number;
        max: number;
    };
    weather: WeatherCondition[];
    uvi: number;
    pop: number;
    hourly: HourlyForecast[];
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface CityResult {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    local_names?: { [key: string]: string };
}
