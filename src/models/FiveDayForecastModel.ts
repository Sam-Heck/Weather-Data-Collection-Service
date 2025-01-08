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
