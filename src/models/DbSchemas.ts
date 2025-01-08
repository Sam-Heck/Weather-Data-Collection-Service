export interface CityDbSchema {
    id: number;
    name: string;
    country: string;
    lat: number;
    lon: number;
    timezone: number;
}

export interface CurrentWeatherDbSchema {
    city_id: number;
    forecast_time: number;
    weather_condition: string;
    condition_desc: string;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    clouds: number;
}

export interface FiveDayForecastDbSchema {
    city_id: number;
    forecast_time: number;
    weather_condition: string;
    condition_desc: string;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    clouds: number;
    precipitation: number;
}