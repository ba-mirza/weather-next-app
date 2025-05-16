import SearchForm from "@/components/SearchForm";
import WeatherCard from "@/components/WeatherCard";
import {weatherAPI} from "@/service/weatherApi";
import {WeatherData} from "@/types/weather";
import EmptyCard from "@/components/EmptyCard";

export default async function Home({searchParams}: {
    searchParams: {query?: string};
}) {

    const query = searchParams.query;
    let weatherData: WeatherData;

    if(query) {
        const geoCoords = await weatherAPI.searchLocations(query as string);
        const {lat, lon} = geoCoords[0];
        weatherData = await weatherAPI.getCurrentWeather({lat, lon});
    }

    return (
        <>
            <section>
                <SearchForm query={query} />
            </section>

            <section className="py-5">
                    {query ? (
                        <WeatherCard weatherData={weatherData!} />
                    ) :
                        <EmptyCard />
                    }
            </section>
        </>
    );
}
