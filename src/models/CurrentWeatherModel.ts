import { Coord, WeatherCondition, MainWeatherData, Wind, Rain, Snow, Clouds, SystemData } from "./CommonWeatherModels.js";

export interface CurrentWeatherModel {
    coord: Coord;
    weather: WeatherCondition;
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: Wind;
    rain?: Rain;
    snow?: Snow;
    clouds: Clouds;
    dt: number;
    sys: SystemData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface CurrentWeatherDbSchema {
    city_id: number;
    forecast_time: number;
    weather_condition: string;
    condition_desc: string;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    clouds: number;
}