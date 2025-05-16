import Image from 'next/image';
import { Suspense } from 'react'

export default async function WeatherPage({params}: {params: {slug: string}}) {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                    <Image width={50} height={50} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.sys.country}.svg`} alt={data.sys.country} />
                    Country: {data.name}
                <Image width={50} height={50} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x`} alt="icon" />
            </Suspense>
        </>
    )
}
