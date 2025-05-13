import axios, {AxiosInstance} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: process.env.WEATHER_API_URL,
    withCredentials: true,
})

export default api;