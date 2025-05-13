const Container = (
    {children}: Readonly<{children: React.ReactNode}>
) => {
    return (
        <div className="container flex flex-col items-center justify-center py-5">
            {children}
        </div>
    )
}

export default Container;