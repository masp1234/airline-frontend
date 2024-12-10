import {
  Text,
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  HStack,
  Divider,
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

interface TicketProps {
  bookingInfo: TicketData;
}

const BookingTicketInfo = ({ bookingInfo }: TicketProps) => {
  //  const ticket = bookingInfo.tickets[0];

  if (bookingInfo == null) {
    return <div>There are no tickets in this booking.</div>;
  }

  return (
    <Card overflow="hidden" variant="outline">
      <CardHeader>
        <Heading size="lg">Ticket: {bookingInfo.ticketNumber}</Heading>
      </CardHeader>
      <Divider orientation="horizontal" width="auto" />
      <CardBody>
        <HStack spacing="8" align="start">
          {/* Flight Information */}
          <Box flex="1">
            <Heading size="sm" textTransform="uppercase" mb="4">
              Flight Information
            </Heading>
            <Stack spacing="2">
              <Text fontSize="md">
                <strong>Flight Code:</strong> {bookingInfo.flightCode}
              </Text>
              <Text fontSize="md">
                <strong>Price:</strong> ${bookingInfo.price}
              </Text>
              <Text fontSize="md">
                <strong>Class:</strong> {bookingInfo.flightClassName}
              </Text>
              <Text fontSize="md">
                <strong>Departure Port:</strong> {bookingInfo.departurePortName}
              </Text>
              <Text fontSize="md">
                <strong>Arrival Port:</strong> {bookingInfo.arrivalPortName}
              </Text>
            </Stack>
          </Box>

          <Divider height="auto" alignSelf="stretch" orientation="vertical" />

          {/* Passenger Information */}
          <Box flex="1">
            <Heading size="sm" textTransform="uppercase" mb="4">
              Passenger Information
            </Heading>
            <Stack spacing="2">
              <Text fontSize="md">
                <strong>Email:</strong> {bookingInfo.passengerEmail}
              </Text>
              <Text fontSize="md">
                <strong>First Name:</strong> {bookingInfo.passengerFirstName}
              </Text>
              <Text fontSize="md">
                <strong>Last Name:</strong> {bookingInfo.passengerLastName}
              </Text>
            </Stack>
          </Box>
        </HStack>
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
