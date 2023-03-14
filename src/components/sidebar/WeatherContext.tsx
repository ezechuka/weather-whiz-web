import { createContext, useState } from "react";
import { CurrentWeather } from "../../types/CurrentWeather";

type WeatherContextType = {
  weather: CurrentWeather | null;
  setWeather: React.Dispatch<React.SetStateAction<CurrentWeather | null>>
};

type WeatherContextProviderProps = {
  children: React.ReactNode;
};

export const WeatherContext = createContext({} as WeatherContextType);

export const WeatherContextProvider = ({
  children,
}: WeatherContextProviderProps) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
