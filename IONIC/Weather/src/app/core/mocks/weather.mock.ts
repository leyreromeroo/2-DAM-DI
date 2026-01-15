import { WeatherData } from '../models/weather.model';

export const getMockWeather = (lang: string = 'es'): WeatherData => ({
    current: {
        dt: Date.now() / 1000,
        temp: 22.5,
        feels_like: 21.0,
        humidity: 45,
        uvi: 4.2,
        wind_speed: 12.5,
        wind_deg: 210,
        weather: [
            {
                id: 800,
                main: 'Clear',
                description: lang === 'es' ? 'cielo claro' : 'clear sky',
                icon: '01d'
            }
        ]
    },
    hourly: Array.from({ length: 24 }).map((_, i) => ({
        dt: (Date.now() / 1000) + (i * 3600),
        temp: 20 + Math.random() * 5,
        pop: Math.random(),
        wind_speed: 10 + Math.random() * 5,
        wind_deg: 200,
        weather: [
            {
                id: 800,
                main: i % 5 === 0 ? 'Clouds' : 'Clear',
                description: lang === 'es' ? (i % 5 === 0 ? 'nubes dispersas' : 'cielo claro') : (i % 5 === 0 ? 'scattered clouds' : 'clear sky'),
                icon: i % 5 === 0 ? '02d' : '01d'
            }
        ]
    })),
    daily: Array.from({ length: 8 }).map((_, i) => ({
        dt: (Date.now() / 1000) + (i * 86400),
        temp: {
            day: 22 + i,
            min: 15 + i,
            max: 25 + i
        },
        uvi: 5,
        pop: 0.1,
        weather: [
            {
                id: 800,
                main: i % 3 === 0 ? 'Rain' : 'Clear',
                description: lang === 'es' ? (i % 3 === 0 ? 'lluvia ligera' : 'cielo claro') : (i % 3 === 0 ? 'light rain' : 'clear sky'),
                icon: i % 3 === 0 ? '10d' : '01d'
            }
        ],
        hourly: Array.from({ length: 8 }).map((_, hIndex) => ({
            dt: (Date.now() / 1000) + (i * 86400) + (hIndex * 10800),
            temp: 20 + Math.random() * 5,
            weather: [{ id: 800, main: 'Clear', description: 'clear', icon: '01d' }],
            pop: 0,
            wind_speed: 10,
            wind_deg: 200
        }))
    }))
});
