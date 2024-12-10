import { Divider, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import BookingTicketInfo from "../components/BookingTicketInfo";
import useBookings from "../hooks/useBookings";

const BookingInfo = () => {
  const { bookingsQuery } = useBookings();

  if (bookingsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (bookingsQuery.isError) {
    return <div>Error loading booking information.</div>;
  }

  return (
    <GridItem gridArea="main" bg="blackAlpha.200" padding="4" boxShadow="lg">
      <Heading size="xl" mb="4">
        Booking Ticket Information
      </Heading>
      <Divider orientation="horizontal" mb="4" w="100%" />
      <SimpleGrid minChildWidth="49%" spacing={5}>
        {bookingsQuery.data.map((booking: any, index: number) => (
          <BookingTicketInfo key={index} bookingInfo={booking} />
        ))}
      </SimpleGrid>
    </GridItem>
  );
};

export default BookingInfo;
