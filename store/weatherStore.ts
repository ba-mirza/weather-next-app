import {create} from "zustand";
import {WeatherData} from "@/types/weather";

type State = {
    favorites: WeatherData[];
    isLoading: boolean;
    error: string | null;
}

type Action = {
    setStorage: (weatherData: WeatherData) => void;
    getStorage: () => WeatherData[];
    removeFromStorage: (id: string) => void;
    clearError: () => void;
}

type PersistenceType = State & Action;

const STORAGE_KEY = "favorites";

const safelyParseJSON = (json: string | null): WeatherData[] => {
    if (!json) return [];
    try {
        return JSON.parse(json);
    } catch (e) {
        console.error("Error parsing JSON from localStorage:", e);
        return [];
    }
};

const safelyWriteToStorage = (key: string, data: unknown): boolean => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error("Error writing to localStorage:", e);
        return false;
    }
};

const weatherPersistenceStore = create<PersistenceType>()((set, get) => ({
    favorites: [],
    isLoading: false,
    error: null,
    
    setStorage: (weatherData: WeatherData) => {
        set({ isLoading: true, error: null });
        
        try {
            const result = localStorage.getItem(STORAGE_KEY);
            const items: WeatherData[] = safelyParseJSON(result);
            
            const isDuplicate = items.some(item => 
                item.name === weatherData.name && 
                item.sys.country === weatherData.sys.country
            );
            
            if (!isDuplicate) {
                items.push(weatherData);
                const success = safelyWriteToStorage(STORAGE_KEY, items);
                
                if (success) {
                    set({ favorites: items, isLoading: false });
                } else {
                    set({ 
                        error: "Failed to save to favorites. Storage might be full.", 
                        isLoading: false 
                    });
                }
            } else {
                set({ 
                    error: `${weatherData.name}, ${weatherData.sys.country} is already in favorites`,
                    isLoading: false 
                });
            }
        } catch (e) {
            set({ 
                error: e instanceof Error ? e.message : "An unknown error occurred", 
                isLoading: false 
            });
        }
    },
    
    getStorage: () => {
        set({ isLoading: true, error: null });
        
        try {
            if (typeof window === 'undefined') {
                set({ isLoading: false });
                return [];
            }
            
            const result = localStorage.getItem(STORAGE_KEY);
            const data = safelyParseJSON(result);
            set({ favorites: data, isLoading: false });
            return data;
        } catch (e) {
            set({ 
                error: e instanceof Error ? e.message : "Failed to retrieve favorites", 
                isLoading: false,
                favorites: [] 
            });
            return [];
        }
    },
    
    removeFromStorage: (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
            const currentFavorites = get().favorites;
            const updatedFavorites = currentFavorites.filter(
                item => `${item.name}-${item.sys.country}` !== id
            );
            
            const success = safelyWriteToStorage(STORAGE_KEY, updatedFavorites);
            
            if (success) {
                set({ favorites: updatedFavorites, isLoading: false });
            } else {
                set({ 
                    error: "Failed to remove from favorites", 
                    isLoading: false 
                });
            }
        } catch (e) {
            set({ 
                error: e instanceof Error ? e.message : "An unknown error occurred", 
                isLoading: false 
            });
        }
    },
    
    clearError: () => set({ error: null })
}));

export default weatherPersistenceStore;