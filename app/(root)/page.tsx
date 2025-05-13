import {toast} from "sonner";
import SearchForm from "@/components/SearchForm";
import WeatherCard from "@/components/WeatherCard";

export default async function Home({searchParams}: {
    searchParams: Promise<{query?: string}>;
}) {

    const query = (await searchParams).query;

    return (
        <>
            <section>
                <SearchForm query={query} />
            </section>

            <section className="py-5">
                    {query ? (
                        <WeatherCard city={query} />
                    ) : 'Current weather in city'}
            </section>
        </>
    );
}
