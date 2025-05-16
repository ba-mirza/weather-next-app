import {Card, CardContent} from "@/components/ui/card";

const EmptyCard = () => {
    return (
        <Card className="py-5 w-[380px] opacity-50">
            <CardContent>
                <span>Enter city in search</span>
            </CardContent>
        </Card>
    )
}

export default EmptyCard;