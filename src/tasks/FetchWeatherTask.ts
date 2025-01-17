import { WeatherService } from "../services/WeatherService.js";
import { WeatherRepository } from "../repository/WeatherRepository.js";
import { City } from "../data/cities.js";

export class FetchWeatherTask {
    private queryCount = 0;
    private startTime: Date;
    constructor(
        private weatherService: WeatherService, 
        private weatherRepository: WeatherRepository,
        private cities: City[],
        private intervalMs: number = 60000
    ) {
        this.startTime = new Date();
    }

    private async fetchWeather(): Promise<void> {
        for (const city of this.cities) {
            try {
                // Fetchand save current weather data
                const currentWeatherData = await this.weatherService.getCurrentWeather(city.lat, city.lon);
                await this.weatherRepository.saveCurrentWeather(currentWeatherData);

                // Fetch and save forecast weather data
                const forecastWeatherData = await this.weatherService.getFiveDayForecast(city.lat, city.lon);
                await this.weatherRepository.saveForecastWeather(forecastWeatherData);
            } catch(error) {
                console.error(`Error fetching weather data for city: ${city.name}`, error);
            }
        }
        this.queryCount++;
        console.log(`Queried API and saved weather data ${this.queryCount} times since ${this.startTime}`)
    }

    public async start(): Promise<void> {
        // Initial execution
        await this.fetchWeather();

        // Schedule periodic executuion
        setInterval(() => this.fetchWeather(), this.intervalMs);
    }
}