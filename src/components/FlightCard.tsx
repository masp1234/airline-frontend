import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  VStack,
  Box
} from "@chakra-ui/react";
import cardPicture from "../assets/flight-pic.webp";
import { useEffect, useState } from "react";

// TS doesn't like it if the json data doesn't have type-definition.
interface FlightData {
  date: string;
  departurePort: string;
  arrivalPort: string;
  travelTime: number;
  confirmationNumber: string;
}

const FlightCard = () => {
  const [flightData, setFlightData] = useState<FlightData | null>(null);

  useEffect(() => {
    fetch("example-data.json")
      .then((response) => response.json())
      .then((data) => setFlightData(data[0]));
  }, []);

  if (!flightData) {
    return <div>Missing flight data.</div>
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    //  width="50%"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={cardPicture}
        alt={flightData.arrivalPort}
      />

      <Stack>
        <VStack>
          <CardBody>
          <Box mb={4}>
            <Heading size="2">Destination</Heading>
            <Text py="1">
              {flightData.arrivalPort}
            </Text>
          </Box>
          <Box mb={4}>
            <Heading size="2">Departure</Heading>
            <Text py="1">
              {flightData.departurePort}
            </Text>
          </Box>
          <Box mb={4}>
            <Heading size="2">Confirmation Number</Heading>
            <Text py="1">
              {flightData.confirmationNumber}
            </Text>
          </Box>
          <Box mb={4}>
            <Heading size="2">Date</Heading>
            <Text py="1">
              {flightData.date}
            </Text>
          </Box>
          <Box mb={4}>
            <Heading size="2">Travel Time</Heading>
            <Text py="1">
              {flightData.travelTime} hours
            </Text>
          </Box>
          </CardBody>
        </VStack>
      </Stack>
    </Card>
  );
};

export default FlightCard;
