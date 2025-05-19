"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import OptimizedImage from "./OptimizedImage";
import {IMAGE_URL} from "@/config";
import {WeatherData} from "@/types/weather";
import {toast} from "sonner";
import weatherPersistenceStore from "@/store/weatherStore";
import { useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";

const WeatherCard = (
    {weatherData, viewBtn = true}:
    {weatherData: WeatherData, viewBtn?: boolean}
) => {
    const { setStorage, error, isLoading, clearError } = weatherPersistenceStore(
        (state) => ({
            setStorage: state.setStorage,
            error: state.error,
            isLoading: state.isLoading,
            clearError: state.clearError
        })
    );

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-center",
                duration: 3000,
            });
            clearError();
        }
    }, [error, clearError]);

    const handleAddToFavorites = () => {
        setStorage(weatherData);
        
        if (!error) {
            toast.success("Added to Favorites", {
                description: new Date().toDateString(),
                position: "bottom-center",
                duration: 2000,
            });
        }
    };

    return (
        <Card className="py-5 w-[380px] m-3 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Weather</span>
                    {viewBtn && isLoading && (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Link href={`/weatherDetails/${weatherData.name}/?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}`}
                      className="block transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                    <CardTitle className="flex justify-between mb-3 items-center">
                        <span>{weatherData.name}, {weatherData.sys.country}</span>
                        <OptimizedImage 
                            width={32} 
                            height={32} 
                            src={`${IMAGE_URL.FLAG}${weatherData.sys.country}.svg`} 
                            alt={`Flag of ${weatherData.sys.country}`}
                            className="rounded-sm"
                            fallbackSrc='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect></svg>'
                        />
                    </CardTitle>
                </Link>
                <div className="flex justify-self-start items-center gap-2">
                    <OptimizedImage 
                        width={50} 
                        height={50} 
                        src={`${IMAGE_URL.WICONS}${weatherData.weather[0].icon}@4x.png`} 
                        alt={weatherData.weather[0].main}
                        className="object-contain"
                        showLoadingIndicator={true}
                        priority={true}
                    />
                    <span className="capitalize">{weatherData.weather[0].description}</span>
                </div>
                <div className="flex justify-self-start mt-3">
                    <span className="text-4xl mr-5 font-semibold">{weatherData.main.temp.toFixed(1)} °C</span>
                    <div className="flex flex-col">
                        <span className="text-red-500 text-sm font-medium">{weatherData.main.temp_max.toFixed(1)} °C</span>
                        <span className="text-blue-500 text-sm font-medium">{weatherData.main.temp_min.toFixed(1)} °C</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                    <div>
                        <p className="text-gray-500">Humidity</p>
                        <p className="font-medium">{weatherData.main.humidity}%</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Wind</p>
                        <p className="font-medium">{weatherData.wind.speed} m/s</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                {
                    viewBtn && (
                        <Button 
                            variant="outline"
                            className="w-full flex items-center gap-2 hover:bg-blue-50"
                            onClick={handleAddToFavorites}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Heart className="h-4 w-4" />
                            )}
                            Add to Favorites
                        </Button>
                    )
                }
            </CardFooter>
        </Card>
    )
}

export default WeatherCard;