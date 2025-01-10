import { setupDatabase } from "./utils/dbSetupScript.js";
import { AxiosHttpClient } from "./utils/AxiosHttpClient.js";
import { WeatherService } from "./services/WeatherService.js";
import { WeatherRepository } from "./repository/WeatherRepository.js";
import { FetchWeatherTask } from "./tasks/FetchWeatherTask.js";
import { WeatherDataTransformer } from "./services/WeatherDataTransformer.js";
import { cities } from "./data/cities.js";

const axiosClient = new AxiosHttpClient();
const weatherService = new WeatherService(axiosClient);
const weatherDataTransformer = new WeatherDataTransformer();
const weatherRepository = new WeatherRepository();
const fetchWeatherTask = new FetchWeatherTask(
    weatherService,
    weatherDataTransformer,
    weatherRepository,
    cities
)

async function main() {
    try {
        // Initialize database
        await setupDatabase();
        
        console.log('Starting the application...');
        fetchWeatherTask.start();
    } catch(error: any) {
        console.error('Failed to initialize the application: ', error);
        process.exit(1);
    }
}

main();
