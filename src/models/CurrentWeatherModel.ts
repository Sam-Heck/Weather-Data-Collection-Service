import { Coord, WeatherCondition, MainWeatherData, Wind, Rain, Snow, Clouds, SystemData } from "./CommonWeatherModels.js";

export interface CurrentWeatherModel {
    coord: Coord;
    weather: WeatherCondition[];
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