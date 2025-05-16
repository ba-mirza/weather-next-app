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


const WeatherCard = ({weatherData}: {weatherData: WeatherData}) => {
    return (
        <Link href={`/weatherDetails/${weatherData.name}`}>
            <Card className="py-5 w-[380px]">
                <CardHeader>
                    <CardTitle>
                        Current Weather
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardTitle className="flex justify-between mb-3">
                        <span>{weatherData.name}, {weatherData.sys.country}</span>
                        <Image width={32} height={32} src={`${IMAGE_URL.FLAG}${weatherData.sys.country}.svg`} alt={weatherData.sys.country} />
                    </CardTitle>
                    <div className="flex justify-self-start items-center">
                        <Image width={50} height={50} src={`${IMAGE_URL.WICONS}${weatherData.weather[0].icon}@4x.png`} alt={weatherData.weather[0].main} />
                        <span>{weatherData.weather[0].description}</span>
                    </div>
                    <span>Temperature: <strong>{weatherData.main.temp.toFixed(1)} °C</strong></span>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">Add to Favorites</Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default WeatherCard;