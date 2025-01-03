import { WeatherService } from "./services/WeatherService.js";
import { AxiosHttpClient } from "./utils/AxiosHttpClient.js";

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

logWeather(47.608013, -122.335167);


