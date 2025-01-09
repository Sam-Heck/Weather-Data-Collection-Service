export interface Coord {
    lat: number;
    lon: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
    temp_kf?: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Rain {
    "1h"?: number;
    "3h"?: number;
}

export interface Snow {
    "1h"?: number;
    "3h"?: number;
}

export interface Clouds {
    all: number;
}

export interface SystemData {
    type: number;
    id: number;
    message?: any;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface ForecastList {
    dt: number;
    main: MainWeatherData;
    weather: WeatherCondition;
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain: Rain;
    snow: Snow;
    sys: {
        pod: string;
    },
    dt_txt: string;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
}