import { WeatherService } from "./services/WeatherService.js";
import { AxiosHttpClient } from "./utils/AxiosHttpClient.js";
import { setupDatabase } from "./utils/dbSetupScript.js";


async function main() {
    try {
        // Initialize database
        await setupDatabase();

        console.log('Starting the application...');
        // test api call as placeholder for application logic
        await logWeather(47.608013, -122.335167);
    } catch(error: any) {
        console.error('Failed to initialize the applicaiton: ', error.message);
        process.exit(1);
    }
}
const axiosClient = new AxiosHttpClient();
const weatherService = new WeatherService(axiosClient);


async function logWeather(lat: number, lon: number) {
    try {
        const weatherData = await weatherService.getCurrentWeather(lat, lon);
        console.log("Current Weather Data:")
        console.log(weatherData);

        const forecastData = await weatherService.getFiveDayForecast(lat, lon);
        console.log("Five day forecast:");
        console.log(forecastData);
    } catch(error) {
        console.error(error);
    }
}

main();
