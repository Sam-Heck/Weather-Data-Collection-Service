import { WeatherService } from "./services/WeatherService.js";
import { AxiosHttpClient } from "./utils/AxiosHttpClient.js";
import { setupDatabase } from "./utils/dbSetupScript.js";
import { WeatherRepository } from "./repository/WeatherRepository.js";

const axiosClient = new AxiosHttpClient();
const weatherService = new WeatherService(axiosClient);
const weatherRepository = new WeatherRepository();

async function main() {
    try {
        // Initialize database
        await setupDatabase();
        
        
        console.log('Starting the application...');
        // call a fetch weather function, which cycles through cities to fetch the weather and save it to the database

    } catch(error: any) {
        console.error('Failed to initialize the applicaiton: ', error.message);
        process.exit(1);
    }
}

main();
