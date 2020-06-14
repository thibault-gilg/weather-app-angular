import { Weather } from '../current-weather/current-weather';

//ForecastWeather model
export interface ForecastWeather {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    daily: Daily[];
}

export interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: Temp;
    feels_like: Feels_like;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    //declared in current-weather.ts
    weather: Weather[]
    clouds: number;
    uvi: number;
}

export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Feels_like {
    day: number;
    night: number;
    eve: number;
    morn: number;
}