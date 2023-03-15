import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Binoculars,
  Cloud,
  Crosshair,
  ThermometerSimple,
  XCircle,
} from "@phosphor-icons/react";

import { MutatingDots } from "react-loader-spinner";

import { useQuery } from "react-query";
import { getCurrentWeather, getWeatherByCity } from "../../api";
import { CurrentWeather } from "../../types/CurrentWeather";

import cityBg from "../../assets/skyscraper.png";
import { useContext, useRef, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { LocationContext } from "./LocationContext";

export type LocationProp = {
  lat: number | undefined;
  long: number | undefined;
};

const Sidebar = (location: LocationProp) => {
  const locationType = useContext(LocationContext);
  const weatherContext = useContext(WeatherContext);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<CurrentWeather>();

  const {
    data: currentPosData,
    error,
    isLoading,
    isError,
  } = useQuery<CurrentWeather, Error>(
    "weather",
    async () => getCurrentWeather(location.lat!, location.long!),
    { enabled: city.length <= 0, onSuccess: (data) => setWeatherData(data) }
  );

  const {
    data: searchData,
    error: searchError,
    isLoading: searchIsLoading,
    isError: searchIsError,
  } = useQuery<CurrentWeather, Error>(
    "search_weather",
    async () => getWeatherByCity(city),
    { enabled: city.length >= 4, onSuccess: (data) => setWeatherData(data) }
  );

  weatherContext.setWeather(weatherData!);

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentTimestamp = weatherData?.dt!;
  const date = new Date();
  date.setTime(currentTimestamp * 1000);
  const day = days[date.getDay()];

  if (isLoading || searchIsLoading) {
    return (
      <Flex
        flexDirection={"column"}
        px={14}
        py={10}
        alignItems={"center"}
        justifyContent={"center"}
        width={{base: '100%', md: "30%"}}
        height={"50vh"}
      >
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          visible={true}
        />
      </Flex>
    );
  }

  return (
    <Flex
      flexDirection={"column"}
      px={{base: 7, md: 14}}
      py={10}
      alignItems={"start"}
      justifyContent={"center"}
      width={{base: '100%', md:"30%"}}
    >
      <HStack>
        <InputGroup justifyContent={"center"}>
          <InputLeftElement
            pointerEvents="none"
            children={<Binoculars size={24} weight={"regular"} />}
          />
          <Input
            placeholder={"Search for places..."}
            variant={"filled"}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCity(e.currentTarget.value);
                locationType.setLocation({
                  coord: null,
                  city: e.currentTarget.value,
                });
              }
            }}
          />
          <InputRightElement>
            <IconButton
              size={"sm"}
              aria-label={"clear search box"}
              icon={<XCircle size={24} weight={"duotone"} />}
              onClick={() => {
                setCity("");
                setSearchTerm("");
                locationType.setLocation({
                  coord: {
                    lat: location.lat,
                    long: location.long,
                  },
                  city: null,
                });
              }}
              cursor={"pointer"}
            />
          </InputRightElement>
        </InputGroup>
      </HStack>

      <Image
        src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
        alt={weatherData?.weather[0].description}
      />

      <Text
        color={"black"}
        fontWeight={"thin"}
        fontSize={"7xl"}
        lineHeight={"90px"}
      >
        {`${Math.round(weatherData?.main.temp!)}`}
        <Text top={"-6"} fontSize={"5xl"} fontWeight={"hairline"} as={"sup"}>
          o
        </Text>
        <Text fontSize={"7xl"} fontWeight={"hairline"} as={"span"}>
          C
        </Text>
      </Text>

      <Text fontWeight={"medium"} mt={2}>
        {`${day}, `}
        <Text as={"span"} color={"gray.500"} fontWeight={"normal"}>
          {`${date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false})}:${date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false})}`}
        </Text>
      </Text>

      <Divider orientation={"horizontal"} my={5} />

      <Stack direction={"row"} alignItems={"center"}>
        <Cloud size={22} weight={"regular"} color={"#aaa"} />
        <Text textTransform={"capitalize"} color={"black"} fontSize={"sm"}>
          {weatherData?.weather[0].description}
        </Text>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} mt={2}>
        <ThermometerSimple size={22} color={"#aaa"} />
        <Text textTransform={"capitalize"} color={"black"} fontSize={"sm"}>
          Feels like - {`${weatherData?.main.feels_like}`}
          <Text textTransform={"none"} as={"sup"}>
            o
          </Text>
          <Text as={"span"}>C</Text>
        </Text>
      </Stack>

      <Center
        position={"relative"}
        rounded={"xl"}
        overflow={"hidden"}
        width={"100%"}
        height={24}
        mt={4}
        backgroundImage={cityBg}
        backgroundPosition={"center bottom"}
        backgroundSize={"350px"}
        backgroundRepeat={"no-repeat"}
      >
        <Box
          position={"absolute"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          bgColor={"blackAlpha.500"}
        />
        <Text
          fontSize={"2xl"}
          fontWeight={"medium"}
          color={"white"}
          zIndex={"base"}
        >
          {`${weatherData?.name}, ${weatherData?.sys.country}`}
        </Text>
      </Center>
    </Flex>
  );
};

export default Sidebar;
