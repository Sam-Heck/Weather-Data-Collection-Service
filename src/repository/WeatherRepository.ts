import { pool } from '../utils/MySqlClient.js'
import { CurrentWeatherDbSchema, FiveDayForecastDbSchema } from '../models/DbSchemas.js'

export class weatherRepository {

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