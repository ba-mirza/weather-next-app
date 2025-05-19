
export const env = {
  WEATHER_API_TOKEN: process.env.WEATHER_API_TOKEN || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  isDev: () => process.env.NODE_ENV === 'development',
  
  validateRequired: () => {
    const required = ['WEATHER_API_TOKEN'];
    const missing = required.filter(key => !env[key as keyof typeof env]);
    
    if (missing.length > 0) {
      if (env.isDev()) {
        console.warn(`Missing required environment variables: ${missing.join(', ')}`);
        return false;
      } else {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
      }
    }
    return true;
  }
};

env.validateRequired();

export const API_CONFIG = {
    BASE_URL: "https://api.openweathermap.org/data/2.5",
    GEO: "https://api.openweathermap.org/geo/1.0",
    API_TOKEN: env.WEATHER_API_TOKEN,
    DEFAULT_PARAMS: {
        units: "metric",
        appid: env.WEATHER_API_TOKEN,
    },
};

export const IMAGE_URL = {
    FLAG: "http://purecatamphetamine.github.io/country-flag-icons/3x2/",
    WICONS: "https://openweathermap.org/img/wn/"
}