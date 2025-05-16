import Image from 'next/image';
import { Suspense } from 'react'
import {weatherAPI} from "@/service/weatherApi";
import {ForecastData, ForecastItem} from "@/types/weather";
import {format} from "date-fns";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function WeatherPage(
    {params, searchParams}:
    {params: {slug: string}, searchParams: { lat: string; lon: string }}
) {

    const {lon, lat} = searchParams;
    const parsedCoords = {
        lon: parseFloat(lon),
        lat: parseFloat(lat),
    }
    const forecastData: ForecastData = await weatherAPI.getForecast({...parsedCoords});

    const dailyForecast = forecastData.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

        if(!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;
    }, {} as Record<string, ForecastItem>);

    const days = Object.keys(dailyForecast);

    console.log(dailyForecast);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {
                    days.map((day: string) => (
                        <Card className="w-[35rem] m-5" key={day}>
                            <CardHeader>
                                <CardTitle>
                                    {params.slug}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                                <div>
                                    <CardTitle>
                                        {format(new Date(dailyForecast[day].date * 1000), "EEE, MMM d")}
                                    </CardTitle>
                                    {dailyForecast[day].weather.main}
                                </div>
                                <div>
                                    <span className="text-red-500 mr-5">↑{dailyForecast[day].temp_max.toFixed(1)} °</span>
                                    <span className="text-blue-500">↓{dailyForecast[day].temp_min.toFixed(1)} °</span>
                                </div>
                                <div>
                                    <span className="p-2">
                                        {dailyForecast[day].humidity}%
                                    </span>
                                    <span className="p-2">
                                        {dailyForecast[day].wind.speed.toFixed(1)}m/s
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </Suspense>
        </>
    )
}
