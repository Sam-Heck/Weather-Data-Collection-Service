import 'dotenv/config'
import { HttpClient } from "../utils/HttpClient.js";
import { CurrentWeatherModel } from "../models/CurrentWeatherModel.js";
import { FiveDayForecastModel } from "../models/FiveDayForecastModel.js";

export class WeatherService {
    private currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
    private fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?"

    constructor(private httpClient: HttpClient) {}

    async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherModel> {
        const url = `${this.currentWeatherUrl}lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
        try {
            const response = await this.httpClient.get(url);
            return response;
        } catch (error) {
            console.error(`Error fetching current weather for latitude: ${lat} and longitude: ${lon}`);
            throw new Error("Unable to retrieve current weather.");
        }
    }

    async getFiveDayForecast(lat: number, lon: number): Promise<FiveDayForecastModel> {
        const url = `${this.fiveDayForecastUrl}lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
        try {
            const response = await this.httpClient.get(url);
            return response;
        } catch (error) {
            console.error(`Error fetching five day forecast for latitude: ${lat} and longitude: ${lon}`);
            throw new Error("Unable to retrieve five day forecast.");
        }
    }
}