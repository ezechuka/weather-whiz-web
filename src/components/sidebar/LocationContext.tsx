import { createContext, useState } from "react";
import { CoordinateType } from "../../hooks/useGeolocation"

type LocationType = {
    coord: CoordinateType | null;
    city: string | null;
}

type LocationContextType = {
    location: LocationType | null;
    setLocation: React.Dispatch<React.SetStateAction<LocationType | null>>
}

export const LocationContext = createContext({} as LocationContextType)

type LocationContextProviderProps = {
    children: React.ReactNode
}

export const LocationContextProvider = ({children}: LocationContextProviderProps) => {
    const [location, setLocation] = useState<LocationType|null>(null)
    return (
        <LocationContext.Provider value={{location, setLocation}}>
            {children}
        </LocationContext.Provider>
    )
}