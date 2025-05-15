import { weatherAPI } from "@/service/weatherApi";
import {createStore} from "zustand";
import { Coordinates, ForecastData, WeatherData } from '../types/weather';

type State = {
    currentCity: WeatherData | null;
    currentCityForecast: ForecastData | null;
}

type Action = {
    getCurrentWeather: (queryName: string) => void;
    getForecastWeather: (coords: Coordinates) => void;
}

export const weatherStore = createStore<State & Action>()((set) => ({
    currentCity: null,
    currentCityForecast: null,
    getCurrentWeather: async (queryName: string) => {
        const coords: Coordinates[] = await weatherAPI.searchLocations(queryName);
        const {lat, lon} = coords[0];
        const currentWeather: WeatherData = await weatherAPI.getCurrentWeather({lat, lon})
        set({currentCity: currentWeather});
        console.log({coords: coords, currentWeather: currentWeather.weather})
    },
    getForecastWeather: async ({lat, lon}: Coordinates) => {
        // do something...
    }
}))