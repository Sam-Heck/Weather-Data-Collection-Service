import { ForecastList, City } from "./CommonWeatherModels.js";

export interface FiveDayForecastModel {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastList[];
    city: City;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface FiveDayForecastDbSchema {
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
    precipitation: number;
}
