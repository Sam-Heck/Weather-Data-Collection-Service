import { ForecastList, City } from "./CommonWeatherModels.js";

export interface FiveDayForecastModel {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastList[];
    city: City;
}
