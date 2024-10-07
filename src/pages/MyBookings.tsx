import { GridItem } from "@chakra-ui/react"
import FlightCard from "../components/FlightCard"


const MyBookings = () => {
  return (
    <GridItem
      gridArea="main"
      bg="blackAlpha.200"
      padding="4"
      boxShadow="lg"
      >

    <FlightCard  />
    </GridItem>
  )
}

export default MyBookings
