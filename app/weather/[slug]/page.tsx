import { Suspense } from 'react'

export default function WeatherPage() {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <h1>Weather Component</h1>
            </Suspense>
        </>
    )
}
