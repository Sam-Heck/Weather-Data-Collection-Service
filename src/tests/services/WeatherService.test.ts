import { WeatherService } from "../../services/WeatherService.js";
import { AxiosHttpClient } from "../../utils/AxiosHttpClient.js";
import { WeatherDataTransformer } from "../../services/WeatherDataTransformer.js";
import { CurrentWeatherModel } from "../../models/CurrentWeatherModel.js";
import { CurrentWeatherDbSchema, FiveDayForecastDbSchema } from "../../models/DbSchemas.js";
import 'dotenv/config'
import { FiveDayForecastModel } from "../../models/FiveDayForecastModel.js";

jest.mock("../../utils/AxiosHttpClient.ts")

describe("WeatherService", () => {
    let weatherService: WeatherService;
    const mockHttpClient = new AxiosHttpClient() as jest.Mocked<AxiosHttpClient>;
    const mockDataTransformer = new WeatherDataTransformer() as jest.Mocked<WeatherDataTransformer>;

    
    beforeEach(() => {
        weatherService = new WeatherService(mockHttpClient, mockDataTransformer);
    });
    
    it("should fetch current weather data and return transformed response", async () => {

        const mockApiResponse:CurrentWeatherModel  = {
            coord: {
                lat: 47.608013,
                lon: -122.335167,
            },
            weather: {
                id: 1,
                main: "Sunny",
                description: "Clear skies",
                icon: "s1d"
            },
            base: "0",
            main: {
                temp: 47.83,
                temp_min: 0,
                temp_max: 53,
                feels_like: 44.34,
                pressure: 1021,
                humidity: 60,
                sea_level: 0,
                grnd_level: 0
            },
            visibility: 10000,
            wind: {
                speed: 4.09,
                deg: 121,
                gust: 8
            },
            clouds: {
                all: 0
            },
            dt: 987654321,
            sys: {
                type: 0,
                id: 0,
                country: "USA",
                sunrise: 0,
                sunset: 0
            },
            timezone: 0,
            id: 0,
            name: "Seattle",
            cod: 0
        }

        const transformedMockResponse: CurrentWeatherDbSchema = {
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

        expect(result).toEqual(transformedMockResponse);
    })

    it("should fetch forecast weather data and return transformed response", async () => {
        const mockApiResponse: FiveDayForecastModel = {
            "cod": "200",
            "message": 0,
            "cnt": 40,
            "list": [
            {
                dt: 1661871600,
                main: {
                temp: 296.76,
                feels_like: 296.98,
                temp_min: 296.76,
                temp_max: 297.87,
                pressure: 1015,
                sea_level: 1015,
                grnd_level: 933,
                humidity: 69,
                temp_kf: -1.11
                },
                weather: [
                {
                    id: 500,
                    main: "Rain",
                    description: "light rain",
                    icon: "10d"
                }
                ],
                clouds: {
                all: 100
                },
                wind: {
                speed: 0.62,
                deg: 349,
                gust: 1.18
                },
                visibility: 10000,
                pop: 0.32,
                rain: {
                "3h": 0.26
                },
                sys: {
                pod: "d"
                },
                dt_txt: "2022-08-30 15:00:00"
            }],
            city: {
            id: 3163858,
            name: "Zocca",
            coord: {
                lat: 44.34,
                lon: 10.99
            },
            country: "IT",
            population: 4593,
            timezone: 7200,
            sunrise: 1661834187,
            sunset: 1661882248
            }
        }

        const transformedMockResponse: FiveDayForecastDbSchema[] = [{
            lat: 44.34,
            lon: 10.99,
            dt: 1661871600,
            weather_condition: "Rain",
            condition_desc: "light rain",
            temp: 296.76,
            feels_like: 296.98,
            pressure: 1015,
            humidity: 69,
            visibility: 10000,
            wind_speed: 0.62,
            wind_deg: 349,
            clouds: 100,
            precipitation: 0.32
        }];

        mockHttpClient.get.mockResolvedValue(mockApiResponse);

        const result = await weatherService.getFiveDayForecast(mockApiResponse.city.coord.lat, mockApiResponse.city.coord.lon)

        expect(mockHttpClient.get).toHaveBeenCalledWith("https://api.openweathermap.org/data/2.5/forecast", expect.objectContaining({
            params: {
                lat: mockApiResponse.city.coord.lat,
                lon: mockApiResponse.city.coord.lon,
                units: 'imperial',
                appid: process.env.WEATHER_API_KEY
            }
        }))
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(1);
        expect(result).toEqual(transformedMockResponse);
    })
})