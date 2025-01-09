import { setupDatabase } from "./utils/dbSetupScript.js";
import { AxiosHttpClient } from "./utils/AxiosHttpClient.js";
import { WeatherService } from "./services/WeatherService.js";
import { WeatherRepository } from "./repository/WeatherRepository.js";
import { fetchWeatherTask } from "./tasks/fetchWeatherTask.js";

const axiosClient = new AxiosHttpClient();
const weatherService = new WeatherService(axiosClient);
const weatherRepository = new WeatherRepository();

async function main() {
    try {
        // Initialize database
        await setupDatabase();
        console.log('Starting the application...');
        
        // start fetchWeather task
        await fetchWeatherTask(weatherService, weatherRepository);
    } catch(error: any) {
        console.error('Failed to initialize the application: ', error);
        process.exit(1);
    }
}

main();
