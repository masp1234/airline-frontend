import { Divider, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import BookingTicketInfo from "../components/BookingTicketInfo";
import { useParams } from "react-router-dom";
import useBookings from "../hooks/useBookings";
import { useAppSelector } from "../hooks/useRedux";

const TicketInfo = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const email = useAppSelector((state) => state.loginUserData.data?.email);
  const { bookingsQuery } = useBookings(email);

  if (bookingsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (bookingsQuery.isError) {
    return <div>Error loading booking information.</div>;
  }

  // Finds the specific booking by ID
  const booking = bookingsQuery.data?.find(
    (b: any) => b.id.toString() === bookingId
  );

  if (!booking) {
    return <div>No booking found for the given ID.</div>;
  }

  return (
    <GridItem gridArea="main" bg="blackAlpha.200" padding="4" boxShadow="lg">
      <Heading size="xl" mb="4">
        Ticket Information for booking: {booking.confirmationNumber}
      </Heading>
      <Divider orientation="horizontal" mb="4" w="100%" />
      <SimpleGrid minChildWidth="49%" spacing={5}>
        {booking.tickets?.map((ticket: any) => (
          <BookingTicketInfo key={ticket.ticketNumber} ticketInfo={ticket} />
        ))}
      </SimpleGrid>
    </GridItem>
  );
};

export default TicketInfo;
