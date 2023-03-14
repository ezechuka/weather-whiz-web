import { Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getHourlyWeather, getHourlyWeatherByCity } from "../../api";
import { HourlyWeather } from "../../types/HourlyWeather";
import { LocationContext } from "../sidebar/LocationContext";
import { LocationProp } from "../sidebar/Sidebar";
import { MutatingDots } from 'react-loader-spinner'

type HourlyProp = {
  day: string;
  time: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
};

const HourlyCard = (prop: HourlyProp) => {
  return (
    <Stack
      direction={"column"}
      justifyContent={"space-between"}
      alignItems={'center'}
      backgroundColor={"white"}
      rounded={"2xl"}
      boxShadow={"sm"}
      p={4}
    >
      <Text color={'black'} fontSize={'xs'} fontWeight={'medium'}>{prop.day}</Text>
      <Text color={'gray.500'} fontSize={'xs'} fontWeight={'medium'}>{prop.time}</Text>
      <Image src={`https://openweathermap.org/img/wn/${prop.icon}@2x.png`} alt={""} />
      <HStack>
        <Text fontSize={'xs'} color={'black'}>
        {`${prop.maxTemp}`}<Text textTransform={'none'} as={'sup'}>o</Text>
        <Text as={'span'}>C</Text>
        </Text>

        <Text fontSize={'xs'} color={'gray.500'}>
        {`${prop.minTemp}`}<Text textTransform={'none'} as={'sup'}>o</Text>
        <Text as={'span'}>C</Text>
        </Text>
      </HStack>
    </Stack>
  );
};

const TopInfo = (location: LocationProp) => {
  const locationType = useContext(LocationContext)
  console.log(locationType.location)

  const [weatherData, setWeatherData] = useState<HourlyWeather>();
  const { data, error, isLoading, isError } = useQuery<HourlyWeather, Error>(
    "hourly_weather",
    async () => getHourlyWeather(location.lat!, location.long!),
    { enabled: locationType.location?.coord !== null, onSuccess(data) {
      setWeatherData(data)
    }, }
  );

  const { data: sdata, error: serror, isLoading: sisLoading, isError: sisError } = useQuery<HourlyWeather, Error>(
    "hourly_weather",
    async () => getHourlyWeatherByCity(locationType.location?.city!),
    { enabled: locationType.location?.coord === null, onSuccess(data) {
      setWeatherData(data)
    }, }
  );

  var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  if (isLoading || sisLoading) {
    return (
      <Flex
        flexDirection={"column"}
        px={14}
        py={10}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
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
    <Flex px={14} py={10} flexDirection={"column"}>
      <Text fontWeight={"semibold"} color={"black"}>
        Today - 3 Hour Interval
      </Text>

      <HStack
        mt={6}>
        {weatherData?.list?.map((d, i) => {
          const hourlyTimestamp = d.dt;
          const date = new Date();
          date.setTime(hourlyTimestamp * 1000);
          const day = days[date.getDay()];

          if (i < 6) {
            return (
              <HourlyCard
                key={d.dt}
                day={day}
                time={`${date.getHours()}:${date.getMinutes()}`}
                icon={d.weather[0].icon}
                maxTemp={d.main.temp_max}
                minTemp={d.main.temp_min}
              />
            );
          }
        })}
      </HStack>
    </Flex>
  );
};

export default TopInfo;
