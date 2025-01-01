export interface CurrentWeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: WeatherCondition[];
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: Wind;
    rain?: Rain;
    snow?: Snow;
    clouds: Clouds;
    dt: number;
    sys: SystemData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    tem: number;
    feels_lik: number;
    temp_mi: number;
    temp_ma: number;
    pressur: number;
    humidit: number;
    sea_leve: number;
    grnd_leve: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Rain {
    "1h"?: number;
}

export interface Snow {
    "1h"?: number;
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