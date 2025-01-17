import { AxiosHttpClient } from "./utils/AxiosHttpClient.js";
import { WeatherService } from "./services/WeatherService.js";
import { WeatherRepository } from "./repository/WeatherRepository.js";
import { FetchWeatherTask } from "./tasks/FetchWeatherTask.js";
import { WeatherDataTransformer } from "./services/WeatherDataTransformer.js";
import { cities } from "./data/cities.js";

const axiosClient = new AxiosHttpClient();
const weatherDataTransformer = new WeatherDataTransformer();
const weatherService = new WeatherService(axiosClient, weatherDataTransformer);
const weatherRepository = new WeatherRepository();
const fetchWeatherTask = new FetchWeatherTask(
    weatherService,
    weatherRepository,
    cities
)

async function main() {
    try {
        console.log('Starting the application...');
        fetchWeatherTask.start();
    } catch(error: any) {
        console.error('Failed to initialize the application: ', error);
        process.exit(1);
    }
}

main();
