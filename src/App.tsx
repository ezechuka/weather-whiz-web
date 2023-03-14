import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import BottomInfo from "./components/bottominfo/BottomInfo";
import {
  LocationContext,
  LocationContextProvider,
} from "./components/sidebar/LocationContext";
import Sidebar from "./components/sidebar/Sidebar";
import { WeatherContextProvider } from "./components/sidebar/WeatherContext";
import TopInfo from "./components/topinfo/TopInfo";
import useGeolocation from "./hooks/useGeolocation";

function App() {
  const queryClient = new QueryClient();
  const location = useGeolocation();
  const locationType = useContext(LocationContext);

  return (
    <QueryClientProvider client={queryClient}>
      <LocationContextProvider>
        <WeatherContextProvider>
          {location?.loaded === true && location.status === "SUCCESS" && (
            <Flex alignItems={"start"}>
              <Sidebar lat={location.coord.lat} long={location.coord.long} />
              <Flex flexDirection={"column"} width={"70%"} bgColor={"gray.100"}>
                <TopInfo lat={location.coord.lat} long={location.coord.long} />
                <BottomInfo />
              </Flex>
            </Flex>
          )}
        </WeatherContextProvider>
      </LocationContextProvider>
    </QueryClientProvider>
  );
}

export default App;