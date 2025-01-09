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

        try {
            await pool.query(query, Object.values(weatherData));
            console.log(`Current weather data for lat: ${weatherData.lat} and lon: ${weatherData.lon} saved successfully!`)
        } catch(error) {
            console.error(`Error saving current weather data for lat: ${weatherData.lat} and lon: ${weatherData.lon} `, error);
            throw new Error('Error saving current weather data')
        }
    }

    async saveForecastWeather(forecastData: FiveDayForecastDbSchema[]): Promise<void> {

        // add some logig or another function to query db and remove any forecast data that is past current time. 

        const query = `
            INSERT INTO forecast_weather (lat, lon, dt, weather_condition, condition_desc, temp, feels_like, pressure, humidity, visibility, wind_speed, wind_deg, clouds, precipitation)
            VALUES ?
            ON DUPLICATE KEY UPDATE
                lat = VALUES(lat),
                lon = VALUES(lon),
                dt = VALUES(dt),
                weather_condition = VALUES(weather_condition),
                condition_desc = VALUES(condition_desc),
                temp = VALUES(temp),
                feels_like = VALUES(feels_like),
                pressure = VALUES(pressure),
                humidity = VALUES(humidity),
                visibility = VALUES(visibility),
                wind_speed = VALUES(wind_speed),
                wind_deg = VALUES(wind_deg),
                clouds = VALUES(clouds),
                precipitation = VALUES(precipitation);
        `
        // creates an array of arrays containing forecast values for batching
        const values = forecastData.map(forecast => Object.values(forecast));

        try {
            await pool.query(query, [values]);
            console.log(`Five day forecast weather data for lat: ${forecastData[0].lat} and lon: ${forecastData[0].lon} saved successfully!`)
        } catch(error) {
            console.error(`Error saving five day forecast data for lat: ${forecastData[0].lat} and lon: ${forecastData[0].lon}`, error);
            throw new Error('Error saving five day forecast data');
        }
    }
}