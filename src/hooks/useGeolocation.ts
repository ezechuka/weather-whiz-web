import { useEffect, useState } from "react";

export type CoordinateType = {
    long: number | undefined;
    lat: number | undefined;
};

export type LocationType = {
    coord: CoordinateType;
    status: "SUCCESS" | "ERROR";
    loaded: boolean;
    message: string;
  };

const useGeolocation = () => {
    const [location, setLocation] = useState<LocationType | null>(null)

    function onSuccess(position: GeolocationPosition) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        setLocation({
          coord: {
            long: longitude,
            lat: latitude,
          },
          loaded: true,
          status: "SUCCESS",
          message: "",
        });
      }

      function onError(position: GeolocationPositionError) {
        setLocation({
          coord: {
            long: 0,
            lat: 0,
          },
          loaded: true,
          status: "ERROR",
          message: "Unable to retrieve your location",
        });
      }

      useEffect(() => {
        if (!(navigator.geolocation)) {
            setLocation(() => ({
                coord: {
                  long: 0,
                  lat: 0,
                },
                loaded: true,
                status: "ERROR",
                message: "Geolocation is not supported by your browser",
              }));
          } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
          }
      }, [])

      return location;
}

export default useGeolocation