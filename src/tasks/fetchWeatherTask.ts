import { WeatherService } from "../services/WeatherService.js";
import { WeatherRepository } from "../repository/WeatherRepository.js";
import { cities } from "../data/cities.js";

export async function fetchWeatherTask(weatherService: WeatherService, weatherRepository: WeatherRepository, intervalMs: number = 60000) {
    let queryCount = 0;
    const startTime = new Date();

    async function fetchWeather() {
        for (const city of cities) {
            const currentWeatherData = await weatherService.getCurrentWeather(city.lat, city.lon);
            await weatherRepository.saveCurrentWeather(currentWeatherData);
            const forecastWeatherData = await weatherService.getFiveDayForecast(city.lat, city.lon);
            await weatherRepository.saveForecastWeather(forecastWeatherData);
        }
        queryCount++;
        console.log(`Queried API and saved weather data ${queryCount} times since ${startTime}`)
    }

    // Initial execution
    await fetchWeather();

    // Schedule periodic execution
    setInterval(fetchWeather, intervalMs)
}
