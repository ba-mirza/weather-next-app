import {create} from "zustand";
import {WeatherData} from "@/types/weather";

type State = {
    favorites: WeatherData[];
}

type Action = {
    setStorage: (weatherData: WeatherData) => void;
    getStorage: () => WeatherData[];
}

type PersistenceType = State & Action;

const weatherPersistenceStore = create<PersistenceType>()((set) => ({
    favorites: [],
    setStorage: (weatherData: WeatherData) => {
        const items: WeatherData[] = [];
        const result = localStorage.getItem("favorites");
        if (!result?.trim()) {
            items.push(weatherData);
            localStorage.setItem("favorites", JSON.stringify(items));
            return;
        }

        const data = JSON.parse(result);
        items.push(...data, weatherData);
        localStorage.setItem("favorites", JSON.stringify(items));
    },
    getStorage: () => {
        const data: WeatherData[] = JSON.parse(localStorage.getItem("favorites") as string);
        set({favorites: data});
        return data;
    },
}));

export default weatherPersistenceStore;