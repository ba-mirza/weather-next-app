import SearchForm from "@/components/SearchForm";
import WeatherCard from "@/components/WeatherCard";
import {weatherAPI} from "@/service/weatherApi";
import {WeatherData} from "@/types/weather";
import EmptyCard from "@/components/EmptyCard";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default async function Home({searchParams}: {
    searchParams: {query?: string};
}) {
    const query = searchParams.query;
    let weatherData: WeatherData | null = null;
    let error: string | null = null;

    if(query) {
        try {
            const geoCoords = await weatherAPI.searchLocations(query);
            
            if (!geoCoords || geoCoords.length === 0) {
                error = `No locations found for "${query}"`;
            } else {
                const {lat, lon} = geoCoords[0];
                weatherData = await weatherAPI.getCurrentWeather({lat, lon});
            }
        } catch (err) {
            console.error('Error fetching weather data:', err);
            error = err instanceof Error ? err.message : 'Failed to fetch weather data';
        }
    }

    return (
        <ErrorBoundary>
            <section>
                <SearchForm query={query} />
            </section>

            <section className="py-5">
                <Suspense fallback={<div className="flex justify-center"><div className="animate-pulse">Loading weather data...</div></div>}>
                    {query ? (
                        error ? (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                                {error}
                            </div>
                        ) : weatherData ? (
                            <WeatherCard weatherData={weatherData} />
                        ) : (
                            <div className="flex justify-center"><div className="animate-pulse">Loading weather data...</div></div>
                        )
                    ) : (
                        <EmptyCard />
                    )}
                </Suspense>
            </section>
        </ErrorBoundary>
    );
}
