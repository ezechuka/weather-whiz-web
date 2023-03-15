import { Circle, Flex, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import { Wind } from "@phosphor-icons/react";
import { useContext } from "react";

import { FiSunrise, FiSunset } from "react-icons/fi";
import { BsThermometerHigh, BsThermometerLow } from "react-icons/bs";
import { WeatherContext } from "../sidebar/WeatherContext";
import { MutatingDots } from "react-loader-spinner";

type WeatherCardProp = {
  children: React.ReactNode;
};

const WeatherCard = ({ children }: WeatherCardProp) => {
  return (
    <Flex
      rounded={"2xl"}
      backgroundColor={"white"}
      boxShadow={"sm"}
      p={6}
      width={"100%"}
      alignItems={"start"}
      justifyContent={"start"}
    >
      {children}
    </Flex>
  );
};

const BottomInfo = () => {
  const weatherContext = useContext(WeatherContext);
  const weatherData = weatherContext.weather;

  const sunriseTimestamp = weatherData?.sys.sunrise!;
  const sunsetTimestamp = weatherData?.sys.sunset!;
  const sunriseDate = new Date();
  const sunsetDate = new Date();
  sunriseDate.setTime(sunriseTimestamp * 1000);
  sunsetDate.setTime(sunsetTimestamp * 1000);

  return (
    <Flex
      px={{ base: 7, md: 14 }}
      pb={10}
      alignItems={"start"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Text fontWeight={"semibold"} color={"black"}>
        Today's Highlights
      </Text>

      <Grid
        width={"full"}
        mt={6}
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={{ base: 3, md: 6 }}
      >
        <WeatherCard>
          <Stack direction={"column"}>
            <Text color={"gray.400"} fontSize={"sm"}>
              Humidity
            </Text>

            <Text color={"black"} fontSize={{ base: "3xl", md: "4xl" }}>
              {weatherData?.main.humidity}
              <Text fontSize={"sm"} as={"span"}>
                %
              </Text>
            </Text>
          </Stack>
        </WeatherCard>

        <WeatherCard>
          <Stack direction={"column"}>
            <Text color={"gray.400"} fontSize={"sm"}>
              Visibility
            </Text>

            <Text color={"black"} fontSize={{ base: "3xl", md: "4xl" }}>
              {`${weatherData?.visibility! / 1000}`}
              <Text fontSize={"sm"} as={"span"}>
                km
              </Text>
            </Text>
          </Stack>
        </WeatherCard>

        <WeatherCard>
          <Stack direction={"column"}>
            <Text color={"gray.400"} fontSize={"sm"}>
              Atmospheric Pressure
            </Text>

            <Text color={"black"} fontSize={{ base: "3xl", md: "4xl" }}>
              {`${weatherData?.main.pressure}`}
              <Text fontSize={"sm"} as={"span"}>
                hPa
              </Text>
            </Text>
          </Stack>
        </WeatherCard>

        <WeatherCard>
          <Stack direction={"column"}>
            <Text color={"gray.400"} fontSize={"sm"}>
              Wind Status
            </Text>

            <Text color={"black"} fontSize={{ base: "3xl", md: "4xl" }}>
              {weatherData?.wind.speed}
              <Text fontSize={"sm"} as={"span"}>
                m/s
              </Text>
            </Text>

            <HStack alignItems={"start"}>
              <Wind size={24} />
              <Text
                fontSize={"sm"}
                as={"span"}
                fontWeight={"medium"}
                color={"gray.500"}
              >
                Wind direction - {weatherData?.wind.deg}
                <Text as={"sup"}>o</Text>
              </Text>
            </HStack>
          </Stack>
        </WeatherCard>

        <WeatherCard>
          <Stack direction={"column"} spacing={4}>
            <Text color={"gray.400"} fontSize={"sm"}>
              Sunrise & Sunset
            </Text>

            <HStack alignItems={"center"}>
              <Circle
                size={{ base: "45px", md: "50px" }}
                bgColor={"yellow.300"}
                borderColor={"orange.300"}
                borderWidth={2}
              >
                <FiSunrise size={"1.5rem"} color={"black"} />
              </Circle>
              <Text fontSize={"md"} as={"span"} fontWeight={"medium"}>
                {`${sunriseDate.getHours().toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}:${sunriseDate.getMinutes().toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}`}
              </Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Circle
                size={{ base: "45px", md: "50px" }}
                bgColor={"yellow.300"}
                borderColor={"orange.300"}
                borderWidth={2}
              >
                <FiSunset size={"1.5rem"} color={"black"} />
              </Circle>
              <Text fontSize={"md"} as={"span"} fontWeight={"medium"}>
                {`${sunsetDate.getHours().toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}:${sunsetDate
                  .getMinutes()
                  .toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}`}
              </Text>
            </HStack>
          </Stack>
        </WeatherCard>

        <WeatherCard>
          <Stack direction={"column"} spacing={4}>
            <Text color={"gray.400"} fontSize={"sm"}>
              Max & Min Temperature
            </Text>

            <HStack alignItems={"center"}>
              <Circle
                size={{ base: "45px", md: "50px" }}
                bgColor={"yellow.300"}
                borderColor={"orange.300"}
                borderWidth={2}
              >
                <BsThermometerHigh size={"1.5rem"} color={"black"} />
              </Circle>
              <Text fontSize={"md"} as={"span"} fontWeight={"medium"}>
                {`${weatherData?.main.temp_max}`}
                <Text textTransform={"none"} as={"sup"}>
                  o
                </Text>
                <Text as={"span"}>C</Text>
              </Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Circle
                size={{ base: "45px", md: "50px" }}
                bgColor={"yellow.300"}
                borderColor={"orange.300"}
                borderWidth={2}
              >
                <BsThermometerLow size={"1.5rem"} color={"black"} />
              </Circle>
              <Text fontSize={"md"} as={"span"} fontWeight={"medium"}>
                {`${weatherData?.main.temp_min}`}
                <Text textTransform={"none"} as={"sup"}>
                  o
                </Text>
                <Text as={"span"}>C</Text>
              </Text>
            </HStack>
          </Stack>
        </WeatherCard>
      </Grid>
    </Flex>
  );
};

export default BottomInfo;
