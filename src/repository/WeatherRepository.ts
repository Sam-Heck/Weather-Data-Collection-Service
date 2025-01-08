import { pool } from '../utils/MySqlClient.js'
import { CurrentWeatherDbSchema } from '../models/CurrentWeatherModel.js'
import { FiveDayForecastDbSchema } from '../models/FiveDayForecastModel.js'

export class weatherRepository {

    async saveCity(): Promise<void> {
        try {
            // save city data to db. need to define a city interface in models.
        } catch(error) {

        }
    }

    async saveCurrentWeather(weatherData: CurrentWeatherDbSchema): Promise<void> {
        try {
            // if record with current city and dt exists: update fields if different, otherwise add new record
        } catch(error) {
            // to do: finish error handling
        }
    }

    async saveForecastWeather(forecastData: FiveDayForecastDbSchema[]): Promise<void> {
        try {
            // 
        } catch(error) {
            // to do: finish error handling
        }
    }
}