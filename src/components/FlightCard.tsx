import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import cardPicture from "../assets/flight-pic.webp";
import { Link } from "react-router-dom";

// Need Tickets and flights.
// Ticket data can already be aquired through bookings.
// Flight data need to be aquired through a different query (findFlightById and then set it to flightId in tickets?)
// There is already a hook to get flight data by id, useFlight.
// Flight and Ticket data is only necessairy on new page?

/*
interface TicketData {
  price: number;
  ticketNumber: string;
}

interface FlightData {
  arrivalPort: string;
  departurePort: string;
  confirmationNumber: string;
  date: string;
  travelTime: number;
}*/

interface BookingData {
  id: number;
  confirmationNumber: string;
}

interface FlightCardProps {
  bookingData: BookingData;
}

const FlightCard = ({ bookingData }: FlightCardProps) => {
  if (!bookingData) {
    return <div>There are no bookings.</div>;
  }

  return (
    <Link to={`/my-bookings/${bookingData.id}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          transition: "transform 0.2s",
          _hover: {
            transform: "scale(1.02)",
          },
        }}
      >
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={cardPicture}
            alt={`Flight to place`}
          />
          <Stack>
            <VStack>
              <CardBody>
                <Box mb={4}>
                  <Heading size="2">Confirmation Number</Heading>
                  <Text py="1">{bookingData.confirmationNumber}</Text>
                </Box>
                <Box mb={4}>
                  <Heading size="2">Departure</Heading>
                  <Text py="1">{"Departure"}</Text>
                </Box>
                <Box mb={4}>
                  <Heading size="2">Arrival</Heading>
                  <Text py="1">{"Arrival"}</Text>
                </Box>
                <Box mb={4}>
                  <Heading size="2">Date</Heading>
                  <Text py="1">{"Date"}</Text>
                </Box>
                <Box mb={4}>
                  <Heading size="2">Travel Time</Heading>
                  <Text py="1">{"69420"} hours</Text>
                </Box>
              </CardBody>
            </VStack>
          </Stack>
        </Card>
      </Box>
    </Link>
  );
};

export default FlightCard;
