import { weatherStore } from '@/store/weatherStore';
import Image from 'next/image';
import { Suspense } from 'react'

export default async function WeatherPage({params}: {params: {slug: string}}) {
    await weatherStore.getInitialState().getCurrentWeather(params.slug);
    const data = weatherStore.getState().currentCity;

    if(!data) {
        return <>Not Found</>
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <h1>Weather Component</h1>
                <Image width={50} height={50} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x`} alt="icon" />
            </Suspense>
        </>
    )
}
