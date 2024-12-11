import { GridItem, SimpleGrid } from "@chakra-ui/react";
import FlightCard from "../components/FlightCard";
import useBookings from "../hooks/useBookings";
import { useAppSelector } from "../hooks/useRedux";

const MyBookings = () => {
  const email = useAppSelector((state) => state.loginUserData.data?.email);

  const { bookingsQuery } = useBookings(email);

  if (bookingsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (bookingsQuery.isError) {
    return <div>Error loading bookings.</div>;
  }

  const bookings = bookingsQuery.data || [];

  return (
    <GridItem gridArea="main" bg="blackAlpha.200" padding="4" boxShadow="lg">
      <SimpleGrid minChildWidth="49%" spacing={5}>
        {bookings.map((booking: any, index: number) => (
          <FlightCard key={index} bookingData={booking} />
        ))}
      </SimpleGrid>
    </GridItem>
  );
};

export default MyBookings;
