import React, { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  ScaleFade,
  Spinner,
  Text,
  Center,
  Divider,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import WeatherCard from "../components/Weather/index";
import InfoCard from "../components/Info/index";

import { WeatherContext } from "../contexts/WeatherContext";

export const App = () => {
  const { data, status, getUpdate } = useContext(WeatherContext);

  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.700">
      <Container maxW="container.xl">
        <Flex align="center" justify="center" py={10}>
          {data ? (
            <ScaleFade initialScale={0.9} in={data !== null}>
              <Box
                roundedTop="xl"
                roundedBottomLeft="xl"
                bg="gray.900"
                p={10}
                shadow="lg"
              >
                <Center>
                  <Text color="white" fontWeight="extrabold" fontSize="3xl">
                    {data.name ? data.name : "Sem nome"}
                  </Text>
                </Center>

                <Divider my={10} borderColor="gray.800" />

                <Flex align="center">
                  <WeatherCard
                    icon={data.weather[0].icon}
                    temp={data.main.temp}
                  />
                  <Box mx={20} p={2} bg="gray.800" />
                  <InfoCard
                    wind={data.wind.speed}
                    humidity={data.main.humidity}
                    clouds={data.clouds.all}
                    desc={data.weather[0].description}
                  />
                </Flex>
              </Box>
              <Flex justify="end">
                <Button
                  onClick={() => getUpdate()}
                  variant="solid"
                  roundedTop="none"
                  color="white"
                  roundedBottom="xl"
                  bg="gray.900"
                  shadow="lg"
                  px={10}
                  _hover={{
                    bg: "gray.900",
                    opacity: 0.5,
                  }}
                  _focus={{
                    bg: "gray.900",
                    outline: "none",
                    border: 0,
                  }}
                  _active={{
                    bg: "gray.900",
                  }}
                >
                  Atualizar
                </Button>
              </Flex>
            </ScaleFade>
          ) : status ? (
            <Box textAlign="center">
              <WarningIcon boxSize={8} color="gray.300" />
              <Text mt={4} color="gray.300">
                {status}
              </Text>
            </Box>
          ) : (
            <Box textAlign="center">
              <Spinner size="xl" color="gray.300" />
              <Text mt={4} color="gray.300">
                Carregando...
              </Text>
            </Box>
          )}
        </Flex>
      </Container>
    </Flex>
  );
};
