import { CurrentWeatherModel } from "../models/CurrentWeatherModel.js";
import { FiveDayForecastModel } from "../models/FiveDayForecastModel.js";
import { CurrentWeatherDbSchema, FiveDayForecastDbSchema } from "../models/DbSchemas.js";

export class WeatherDataTransformer {
    transformCurrentWeatherData(response: CurrentWeatherModel): CurrentWeatherDbSchema {
        const data: CurrentWeatherDbSchema = {
            lat: response.coord.lat,
            lon: response.coord.lon,
            dt: response.dt,
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

    transformForecastWeatherData(response: FiveDayForecastModel): FiveDayForecastDbSchema[] {

        const data: FiveDayForecastDbSchema[]= [];
        for (const entry of response.list) {
            const record: FiveDayForecastDbSchema = {
                lat: response.city.coord.lat,
                lon: response.city.coord.lon,
                dt: entry.dt,
                weather_condition: entry.weather[0].main,
                condition_desc: entry.weather[0].description,
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