import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const WeatherCard = ({
    city,
    description,
    timezone
}: {city: string, description?: string, timezone?: string}) => {
    return (
        <Card className="py-5 w-[380px]">
            <CardHeader>
                <CardTitle>{city}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
            <CardFooter>
                <p>{timezone}</p>
            </CardFooter>
        </Card>
    )
}

export default WeatherCard;