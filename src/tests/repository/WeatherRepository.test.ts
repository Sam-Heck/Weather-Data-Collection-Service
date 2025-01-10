import { WeatherRepository } from "../../repository/WeatherRepository.js";
import { pool } from "../../utils/MySqlClient.js"
import { CurrentWeatherDbSchema, FiveDayForecastDbSchema } from "../../models/DbSchemas.js";

jest.mock("../../utils/MySqlClient", () => ({
    pool: {
        query: jest.fn()
    }
}));

describe("WeatherRepository", () => {
    let weatherRepository: WeatherRepository;

    beforeEach(() => {
        weatherRepository = new WeatherRepository();
        jest.clearAllMocks();
    });

    describe("saveCurrentWeather", () => {
        const mockWeatherData: CurrentWeatherDbSchema = {
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
        };

        it("should save current weather data successfully", async () => {

            (pool.query as jest.Mock).mockResolvedValueOnce({});
            await weatherRepository.saveCurrentWeather(mockWeatherData);

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO current_weather"),
                Object.values(mockWeatherData)
            );
        });

        it("should throw an error if saving current weather data fails", async () => {
            (pool.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));
            await expect(weatherRepository.saveCurrentWeather(mockWeatherData)).rejects.toThrow("Error saving current weather data");

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO current_weather"),
                Object.values(mockWeatherData)
            );
        });
    });

    describe("saveForecastWeather", () => {
        const mockForecastWeatherData: FiveDayForecastDbSchema[] = [{
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

        it("should save forecast weather data sucessfully", async () => {

            (pool.query as jest.Mock).mockResolvedValueOnce({});
            await weatherRepository.saveForecastWeather(mockForecastWeatherData);

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO forecast_weather"),
                [mockForecastWeatherData.map(forecast => Object.values(forecast))]
            )
        });

        it("should throw an error if saving forecast weather data fails", async () => {
            (pool.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));
            await expect(weatherRepository.saveForecastWeather(mockForecastWeatherData)).rejects.toThrow("Error saving five day forecast data");

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining("INSERT INTO forecast_weather"),
                [mockForecastWeatherData.map(forecast => Object.values(forecast))]
            )
        })
    })
});



