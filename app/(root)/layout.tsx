import Header from "@/components/Header";
import Container from "@/components/Container";

export default function Layout(
    {children}: Readonly<{children: React.ReactNode}>
) {
    return (
        <main>
            <Header />
            <Container>
                {children}
            </Container>
        </main>
    )
}