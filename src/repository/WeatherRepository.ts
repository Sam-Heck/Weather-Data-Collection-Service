import { pool }  from '../utils/MySqlClient.js'
import { CurrentWeatherDbSchema, FiveDayForecastDbSchema } from '../models/DbSchemas.js'

export class WeatherRepository {

    async saveCurrentWeather(weatherData: CurrentWeatherDbSchema): Promise<void> {

        const query = `
        INSERT INTO current_weather (lat, lon, dt, weather_condition, condition_desc, temp, feels_like, pressure, humidity, visibility, wind_speed, wind_deg, clouds)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            weather_condition = VALUES(weather_condition),
            condition_desc = VALUES(condition_desc),
            temp = VALUES(temp),
            feels_like = VALUES(feels_like),
            pressure = VALUES(pressure),
            humidity = VALUES(humidity),
            visibility = VALUES(visibility),
            wind_speed = VALUES(wind_speed),
            wind_deg = VALUES(wind_deg),
            clouds = VALUES(clouds);
            `;

            const values = Object.values(weatherData);

        try {
            await pool.query(query, Object.values(weatherData))
            console.log('Current weather data saved successfully!')
        } catch(error) {
            console.error('Error saving current weather data: ', error);
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