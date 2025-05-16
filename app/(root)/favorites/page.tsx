"use client"

import weatherPersistenceStore from "@/store/weatherStore";
import {WeatherData} from "@/types/weather";
import WeatherCard from "@/components/WeatherCard";
import {useEffect, useState} from "react";

export default function FavoritePage() {
    const favorites = weatherPersistenceStore((state) => state.getStorage);
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

    useEffect(() => {
        setWeatherData(favorites());
    }, [favorites]);

    return (
        <>
            {
                weatherData.map((favorite: WeatherData) => (
                    <WeatherCard key={favorite.name} weatherData={favorite} viewBtn={false} />
                ))
            }
        </>
    )
}