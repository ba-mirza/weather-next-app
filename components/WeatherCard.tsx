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
import Image from "next/image";
import {IMAGE_URL} from "@/config";
import {WeatherData} from "@/types/weather";
import {toast} from "sonner";


const WeatherCard = ({weatherData}: {weatherData: WeatherData}) => {

    return (
            <Card className="py-5 w-[380px]">
                <CardHeader>
                    <CardTitle>
                        Weather
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Link href={`/weatherDetails/${weatherData.name}/?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}`}>
                        <CardTitle className="flex justify-between mb-3">
                            <span>{weatherData.name}, {weatherData.sys.country}</span>
                            <Image width={32} height={32} src={`${IMAGE_URL.FLAG}${weatherData.sys.country}.svg`} alt={weatherData.sys.country} />
                        </CardTitle>
                    </Link>
                    <div className="flex justify-self-start items-center">
                        <Image width={50} height={50} src={`${IMAGE_URL.WICONS}${weatherData.weather[0].icon}@4x.png`} alt={weatherData.weather[0].main} />
                        <span>{weatherData.weather[0].description}</span>
                    </div>
                    <div className="flex justify-self-start">
                        <span className="text-4xl mr-5">{weatherData.main.temp.toFixed(1)} °C</span>
                        <div className="flex flex-col">
                            <span className="text-red-500 text-sm">{weatherData.main.temp_max.toFixed(1)} °C</span>
                            <span className="text-blue-500 text-sm">{weatherData.main.temp_min.toFixed(1)} °C</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline"
                            onClick={() => {
                                toast("Added to Favorites", {
                                    description: new Date().toDateString(),
                                    position: "bottom-center",
                                    duration: 2000,
                                })
                            }}
                    >Add to Favorites</Button>
                </CardFooter>
            </Card>
    )
}

export default WeatherCard;