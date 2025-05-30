import api from "@/lib/axios";
import { API_CONFIG } from "../config";
import type {
    WeatherData,
    ForecastData,
    GeocodingResponse,
    Coordinates,
} from "../types/weather";

class WeatherAPI {
    private createParams(params: Record<string, string | number>) {
        if (!API_CONFIG.API_TOKEN) {
            throw new Error("Missing API token");
        }

        return {
            appid: API_CONFIG.API_TOKEN,
            ...params,
        };
    }

    private async fetchData<T>(
        url: string,
        params: Record<string, string | number>
    ): Promise<T> {
        const response = await api.get<T>(url, { params });
        return response.data;
    }

    async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
        const params = this.createParams({
            lat,
            lon,
            units: "metric",
        });
        return this.fetchData<WeatherData>(`${API_CONFIG.BASE_URL}/weather`, params);
    }

    async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
        const params = this.createParams({
            lat,
            lon,
            cnt: 7,
            units: "metric",
        });
        return this.fetchData<ForecastData>(`${API_CONFIG.BASE_URL}/forecast`, params);
    }

    async searchLocations(query: string): Promise<GeocodingResponse[]> {
        const params = this.createParams({
            q: query,
            limit: 5,
        });
        return this.fetchData<GeocodingResponse[]>(`${API_CONFIG.GEO}/direct`, params);
    }
}

export const weatherAPI = new WeatherAPI();
