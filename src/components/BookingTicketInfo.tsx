import {
  Text,
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { format } from 'date-fns';
import { Ticket } from "../types/Ticket";

interface TicketProps {
  ticketInfo: Ticket | null;
}

const BookingTicketInfo = ({ ticketInfo }: TicketProps) => {

  if (ticketInfo == null) {
    return <div>There are no tickets in this booking.</div>;
  }

  return (
    <Card overflow="hidden" variant="outline">
      <CardHeader>
        <Heading size="lg">Ticket: {ticketInfo.ticketNumber}</Heading>
      </CardHeader>
      <Divider orientation="horizontal" width="auto" />
      <CardBody>
        <HStack spacing="8" align="start">
          <Box flex="1">
            <Heading size="sm" textTransform="uppercase" mb="4">
              Flight Information
            </Heading>
            <Stack spacing="2">
              <Text fontSize="md">
                <strong>Flight Code:</strong> {ticketInfo.flightCode}
              </Text>
              <Text fontSize="md">
                <strong>Price:</strong> ${ticketInfo.price}
              </Text>
              <Text fontSize="md">
                <strong>Class:</strong> {ticketInfo.flightClassName}
              </Text>
              <Text fontSize="md">
                <strong>Departure Port:</strong> {ticketInfo.departurePortName}
              </Text>
              <Text fontSize="md">
                <strong>Arrival Port:</strong> {ticketInfo.arrivalPortName}
              </Text>
              <Text fontSize="md">
                <strong>Travel Time:</strong> {ticketInfo.flightTravelTime} minutes
              </Text>
              <Text fontSize="md">
              <strong>Departure Time:</strong> {ticketInfo.flightDepartureTime ? format(new Date(ticketInfo.flightDepartureTime), 'MMMM do, yyyy h:mm a') : 'N/A'}
              </Text>
              <Text fontSize="md">
              <strong>Arrival Time:</strong> {ticketInfo.flightCompletionTime ? format(new Date(ticketInfo.flightCompletionTime), 'MMMM do, yyyy h:mm a') : 'N/A'}
              </Text>
            </Stack>
          </Box>

          <Divider height="auto" alignSelf="stretch" orientation="vertical" />

          <Box flex="1">
            <Heading size="sm" textTransform="uppercase" mb="4">
              Passenger Information
            </Heading>
            <Stack spacing="2">
              <Text fontSize="md">
                <strong>Email:</strong> {ticketInfo.passengerEmail}
              </Text>
              <Text fontSize="md">
                <strong>First Name:</strong> {ticketInfo.passengerFirstName}
              </Text>
              <Text fontSize="md">
                <strong>Last Name:</strong> {ticketInfo.passengerLastName}
              </Text>
            </Stack>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default BookingTicketInfo;