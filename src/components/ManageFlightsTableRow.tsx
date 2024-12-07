import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Hide, Tr, Td, Show } from "@chakra-ui/react";
import Flight from "../types/flight"

interface ManageFlightsTableRowProps {
    flight: Flight
}

const ManageFlightsTableRow = (props: ManageFlightsTableRowProps) => {
    const { flight } = props;

    const navigate = useNavigate();

    return (
        <Fragment key={flight.id}>
      <Hide below="md">
        <Tr
          key={`above-md-${flight.id}`}
          onClick={() => navigate(`/manage-flights/${flight.id}`)}
          _hover={{ bg: "blue.500", cursor: "pointer" }}
        >
          <Td>{flight.flightCode}</Td>
          <Td>{flight.departurePortNavigation.name}</Td>
          <Td>{flight.arrivalPortNavigation.name}</Td>
          <Td>{new Date(flight.departureTime).toLocaleString()}</Td>
          <Td>{new Date(flight.completionTime).toLocaleString()}</Td>
        </Tr>
      </Hide>
      <Show below="md">
        <Tr
          key={`below-md-${flight.id}`}
          onClick={() => navigate(`/manage-flights/${flight.id}`)}
        >
          <Td>{flight.flightCode}</Td>
          <Td>{flight.departurePortNavigation.code}</Td>
          <Td>{flight.arrivalPortNavigation.code}</Td>
        </Tr>
      </Show>
    </Fragment>
    )
}



    export default ManageFlightsTableRow;