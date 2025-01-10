import { WeatherService } from "../../services/WeatherService.js";
import { AxiosHttpClient } from "../../utils/AxiosHttpClient.js";
import { WeatherDataTransformer } from "../../services/WeatherDataTransformer.js";
import 'dotenv/config'

jest.mock("../../utils/AxiosHttpClient.ts")

describe("WeatherService", () => {
    let weatherService: WeatherService;
    const mockHttpClient = new AxiosHttpClient() as jest.Mocked<AxiosHttpClient>;
    const mockDataTransformer = new WeatherDataTransformer() as jest.Mocked<WeatherDataTransformer>;

    
    beforeEach(() => {
        weatherService = new WeatherService(mockHttpClient, mockDataTransformer);
    });
    
    it("should fetch current weather data", async () => {

        const mockApiResponse = {
            coord: {
                lat: 47.608013,
                lon: -122.335167,
            },
            weather: {
                main: "Sunny",
                description: "Clear skies"
            },
            main: {
                temp: 47.83,
                feels_like: 44.34,
                pressure: 1021,
                humidity: 60,
            },
            visibility: 10000,
            wind: {
                speed: 4.09,
                deg: 121,
            },
            clouds: {
                all: 0
            },
            dt: 987654321
        }

        mockHttpClient.get.mockResolvedValue(mockApiResponse)

        const result = await weatherService.getCurrentWeather(mockApiResponse.coord.lat, mockApiResponse.coord.lon);

        expect(mockHttpClient.get).toHaveBeenCalledWith(
            "https://api.openweathermap.org/data/2.5/weather",
            expect.objectContaining({
                params: {
                    lat: mockApiResponse.coord.lat,
                    lon: mockApiResponse.coord.lon,
                    units: 'imperial',
                    appid: process.env.WEATHER_API_KEY,
                }
            })
        );

        expect(result).toEqual({
            lat: 47.608013,
            lon: -122.335167,
            dt: 987654321,
            weather_condition: "Sunny",
            condition_desc: "Clear skies",
            temp: 47.83,
            feels_like: 44.34,
            pressure: 1021,
            humidity: 60,
            visibility: 10000,
            wind_speed: 4.09,
            wind_deg: 121,
            clouds: 0
        });
    })
})