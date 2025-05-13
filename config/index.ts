export const API_CONFIG = {
    BASE_URL: "https://api.openweathermap.org/data/2.5",
    GEO: "https://api.openweathermap.org/geo/1.0",
    API_TOKEN: process.env.WEATHER_API_TOKEN,
    DEFAULT_PARAMS: {
        units: "metric",
        appid: process.env.WEATHER_API_TOKEN,
    },
};