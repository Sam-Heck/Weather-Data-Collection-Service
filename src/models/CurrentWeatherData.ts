import { Coord, WeatherCondition, MainWeatherData, Wind, Rain, Snow, Clouds, SystemData } from "./CommonWeatherModels";

export interface CurrentWeatherData {
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