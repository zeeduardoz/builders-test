import { Box, Flex, Image, Text } from "@chakra-ui/react";

type Props = {
  icon: string;
  temp: number;
};

export default function WeatherCard({ icon, temp }: Props) {
  return (
    <Box mt={-5}>
      <Flex align="center" marginLeft={-3}>
        <Image
          objectFit="cover"
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Icon"
        />
        <Text color="white" fontWeight="extrabold" fontSize="5xl" ml={4}>
          {Math.round(temp)}{" "}
          <Text as="sup" fontSize="3xl" fontWeight="light">
            °C
          </Text>
        </Text>
      </Flex>
      <Box>
        <Text color="gray.500" fontSize="2xl" fontWeight="medium" mt={-1}>
          {new Date().toLocaleDateString("pt-Br", { weekday: "long" })}
        </Text>
        <Text as="abbr" color="gray.500">
          {new Date().toLocaleDateString("pt-Br", { dateStyle: "long" })}
        </Text>
      </Box>
    </Box>
  );
}
