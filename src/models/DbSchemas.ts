export interface CurrentWeatherDbSchema {
    lat: number;
    lon: number;
    dt: number;
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
    lat: number;
    lon: number;
    dt: number;
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