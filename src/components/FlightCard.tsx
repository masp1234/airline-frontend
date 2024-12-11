import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  VStack,
  Box,
  Divider,
} from "@chakra-ui/react";
import cardPicture from "../assets/flight-pic.webp";
import { Link } from "react-router-dom";

interface TicketData {
  flightTravelTime: number;
}

interface BookingData {
  id: number;
  confirmationNumber: string;
  tickets: TicketData[];
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
                  <Heading size="md">Confirmation Number</Heading>
                  <Text py="1" fontSize="lg">{bookingData.confirmationNumber}</Text>
                </Box>
                <Divider orientation="horizontal" width="400px" mb="4" />
                <Box mb={4}>
                  <Heading size="md">Number of tickets</Heading>
                  <Text py="1" fontSize="lg">{bookingData.tickets.length}</Text>
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
