import SearchForm from "@/components/SearchForm";
import WeatherCard from "@/components/WeatherCard";
import {weatherAPI} from "@/service/weatherApi";

export default async function Home({searchParams}: {
    searchParams: {query?: string};
}) {

    const query = searchParams.query;
    const geoCoords = await weatherAPI.searchLocations(query as string);
    const {lat, lon} = geoCoords[0];
    const weatherData = await weatherAPI.getCurrentWeather({lat, lon});

    return (
        <>
            <section>
                <SearchForm query={query} />
            </section>

            <section className="py-5">
                    {query ? (
                        <WeatherCard weatherData={weatherData} />
                    ) : 'Current weather in city'}
            </section>
        </>
    );
}
