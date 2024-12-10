import {
  Text,
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
} from "@chakra-ui/react";

interface TicketData {
  ticketNumber: string;
  price: number;
  flightCode: string;
  departurePortName: string;
  arrivalPortName: string;
  flightClassName: string;
  passengerFirstName: string;
  passengerLastName: string;
  passengerEmail: string;
}

interface BookingData {
  id: number;
  confirmationNumber: string;
  tickets: TicketData[];
}

interface TicketProps {
  bookingInfo: BookingData;
}

const BookingTicketInfo = ({ bookingInfo }: TicketProps) => {
  const ticket = bookingInfo.tickets[0];

  if (bookingInfo.tickets.length === 0) {
    return <div>There are no tickets</div>;
  }

  return (
    <Card overflow="hidden" variant="outline">
      <CardHeader>
        <Heading size="lg">Ticket: {ticket.ticketNumber}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {/* Flight Information */}
          <Box>
            <Heading size="sm" textTransform="uppercase">
              Flight Information
            </Heading>
            <Text pt="2" fontSize="md">
              <strong>Flight Code:</strong> {ticket.flightCode}
            </Text>
            <Text pt="2" fontSize="md">
              <strong>Price:</strong> ${ticket.price}
            </Text>
            <Text pt="2" fontSize="md">
              <strong>Class:</strong> {ticket.flightClassName}
            </Text>
            <Text pt="2" fontSize="md">
              <strong>Departure Port:</strong> {ticket.departurePortName}
            </Text>
            <Text pt="2" fontSize="md">
              <strong>Arrival Port:</strong> {ticket.arrivalPortName}
            </Text>
          </Box>

          {/* Passenger Information */}
          <Box>
            <Heading size="sm" textTransform="uppercase">
              Passenger Information
            </Heading>
            <Text pt="2" fontSize="md">
              <strong>Email:</strong> {ticket.passengerEmail}
            </Text>
            <Text pt="2" fontSize="md">
              <strong>First Name:</strong> {ticket.passengerFirstName}
            </Text>
            <Text pt="2" fontSize="md">
              <strong>Last Name:</strong> {ticket.passengerLastName}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BookingTicketInfo;

/*<Card>
  <CardHeader>
    <Heading size='md'>Client Report</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Summary
        </Heading>
        <Text pt='2' fontSize='sm'>
          View a summary of all your clients over the last month.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Overview
        </Heading>
        <Text pt='2' fontSize='sm'>
          Check out the overview of your clients.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Analysis
        </Heading>
        <Text pt='2' fontSize='sm'>
          See a detailed analysis of all your business clients.
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card> */
