import { Tr, Th, Show } from "@chakra-ui/react";

const ManageFlightsTableHeader = () => {
    return (
        <Tr>
                  <Th>Flight Code</Th>
                  <Th>Departure</Th>
                  <Th>Arrival</Th>
                  <Show above="md">
                    <Th>Departure Date</Th>
                    <Th>Completion Time</Th>
                  </Show>
                </Tr>
    )
}

export default ManageFlightsTableHeader;