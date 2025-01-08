import 'dotenv/config'
import { HttpClient } from "../utils/HttpClient.js";
import { CurrentWeatherModel, CurrentWeatherDbSchema } from "../models/CurrentWeatherModel.js";
import { FiveDayForecastModel, FiveDayForecastDbSchema } from "../models/FiveDayForecastModel.js";

export class WeatherService {
    private currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
    private fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?"

    constructor(private httpClient: HttpClient) {}

    async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherDbSchema> {
        const url = `${this.currentWeatherUrl}lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
        try {
            const response = await this.httpClient.get(url);
            return this.transformCurrentWeatherData(response);
        } catch (error) {
            console.error(`Error fetching current weather for latitude: ${lat} and longitude: ${lon}`);
            throw new Error("Unable to retrieve current weather.");
        }
    }

    async getFiveDayForecast(lat: number, lon: number): Promise<FiveDayForecastDbSchema[]> {
        const url = `${this.fiveDayForecastUrl}lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
        try {
            const response = await this.httpClient.get(url);
            return this.transformForecastWeatherData(response);
        } catch (error) {
            console.error(`Error fetching five day forecast for latitude: ${lat} and longitude: ${lon}`);
            throw new Error("Unable to retrieve five day forecast.");
        }
    }

    private transformCurrentWeatherData(response: CurrentWeatherModel) {
        const data: CurrentWeatherDbSchema = {
            city_id: response.id,
            forecast_time: response.dt,
            weather_condition: response.weather.main,
            condition_desc: response.weather.description,
            temp: response.main.temp,
            feels_like: response.main.feels_like,
            pressure: response.main.pressure,
            humidity: response.main.humidity,
            visibility: response.visibility,
            wind_speed: response.wind.speed,
            wind_deg: response.wind.deg,
            clouds: response.clouds.all
        }
        return data;
    }

    private transformForecastWeatherData(response: FiveDayForecastModel): FiveDayForecastDbSchema[] {

        const data: FiveDayForecastDbSchema[]= [];
        for (const entry of response.list) {
            const record: FiveDayForecastDbSchema = {
                city_id: response.city.id,
                forecast_time: entry.dt,
                weather_condition: entry.weather.main,
                condition_desc: entry.weather.description,
                temp: entry.main.temp,
                feels_like: entry.main.feels_like,
                pressure: entry.main.pressure,
                humidity: entry.main.humidity,
                visibility: entry.visibility,
                wind_speed: entry.wind.speed,
                wind_deg: entry.wind.deg,
                clouds: entry.clouds.all,
                precipitation: entry.pop
            }
            data.push(record);
        }
        return data;
    }
}