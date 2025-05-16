import Link from "next/link";
import {Button} from "@/components/ui/button";

const Header = () => {
    return (
        <header className="px-10 py-3 bg-white shadow-sm">
            <nav>
                <Button variant="outline" asChild>
                    <Link className="text-xl mr-6" href="/">NextWeather</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link className="text-xl" href="/favorites">Favorites</Link>
                </Button>
            </nav>
        </header>
    )
}

export default Header;