import { Box, chakra, Text } from "@chakra-ui/react";

type Props = {
  wind: number;
  humidity: number;
  clouds: number;
  desc: string;
};

export default function InfoCard({ wind, humidity, clouds, desc }: Props) {
  return (
    <Box>
      <Text as="abbr" color="gray.500" display="block" py={1}>
        <chakra.strong color="gray.50">Nebulosidade: </chakra.strong> {clouds}%
      </Text>
      <Text as="abbr" color="gray.500" display="block" py={1}>
        <chakra.strong color="gray.50">Umidade: </chakra.strong> {humidity}%
      </Text>
      <Text as="abbr" color="gray.500" display="block" py={1}>
        <chakra.strong color="gray.50">Vento: </chakra.strong> {wind} km/h
      </Text>
      <Text as="abbr" color="gray.500" display="block" py={1}>
        <chakra.strong color="gray.50">Clima: </chakra.strong> {desc}
      </Text>
    </Box>
  );
}
