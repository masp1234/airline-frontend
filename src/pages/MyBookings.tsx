import { GridItem, SimpleGrid } from "@chakra-ui/react";
import FlightCard from '../components/FlightCard';

const MyBookings = () => {
  return (

    <GridItem
      gridArea="main"
      bg="blackAlpha.200"
      padding="4"
      boxShadow="lg"
      >
      <SimpleGrid minChildWidth="49%" spacing={5}>
        <FlightCard />
        <FlightCard />
        <FlightCard />
        <FlightCard />
      </SimpleGrid>
    </GridItem>
  );
};

export default MyBookings;