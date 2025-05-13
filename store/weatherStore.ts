import {create} from "zustand";
import api from "@/lib/axios";

const useApiStore = create((set) => ({
    city: {},
    callWeatherApi: async () => {
        const data = await api.get("weather").then((res) => res.data);
        set({city: data});
    }
}))