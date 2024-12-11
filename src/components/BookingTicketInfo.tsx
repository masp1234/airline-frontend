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
  flightTravelTime: number;
}

interface TicketProps {
  ticketInfo: TicketData;
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
