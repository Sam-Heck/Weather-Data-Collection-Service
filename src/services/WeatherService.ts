import 'dotenv/config'
import { HttpClient } from "../utils/HttpClient.js";
import { WeatherDataTransformer } from './WeatherDataTransformer.js';
import { CurrentWeatherDbSchema, FiveDayForecastDbSchema } from '../models/DbSchemas.js';

export class WeatherService {
    private currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    private fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

    constructor(
        private httpClient: HttpClient, 
        private dataTransformer: WeatherDataTransformer
    ) {}

    async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherDbSchema> {
        try {
            const response = await this.httpClient.get(this.currentWeatherUrl, {
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'imperial',
                    appid: process.env.WEATHER_API_KEY
                }
            });
            return this.dataTransformer.transformCurrentWeatherData(response);
        } catch (error) {
            console.error(`Error fetching current weather for latitude: ${lat} and longitude: ${lon}`, error);
            throw new Error("Unable to retrieve current weather.");
        }
    }

    async getFiveDayForecast(lat: number, lon: number): Promise<FiveDayForecastDbSchema[]> {
        try {
            const response = await this.httpClient.get(this.fiveDayForecastUrl, {
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'imperial',
                    appid: process.env.WEATHER_API_KEY
                }
            });
            return this.dataTransformer.transformForecastWeatherData(response);
        } catch (error) {
            console.error(`Error fetching five day forecast for latitude: ${lat} and longitude: ${lon}`, error);
            throw new Error("Unable to retrieve five day forecast.");
        }
    }
}