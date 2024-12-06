import {
    Box,
    FormControl,
    FormLabel,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    VStack,
    Show,
    Select,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import Airport from "../types/airport";
  import useAirports from "../hooks/useAirports";
  import DatePicker from "react-datepicker";
  import useSearchFlights from "../hooks/useSearchFlights";
  import Flight from "../types/flight";
  import FlightSearchParameters from "../types/flightSearchParameters";
  
  const ManageFlights = () => {
    const { airportsQuery } = useAirports();
    const [selectedDepartureAirport, setSelectedDepartureAirport] =
      useState<number | null>(null);
    const [selectedArrivalAirport, setSelectedArrivalAirport] =
      useState<number | null>(null);
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(
      new Date()
    );
  
    const filteredDepartureAirports: Airport[] = airportsQuery.data?.airports?.filter(
      (airport: Airport) => airport.id !== selectedArrivalAirport
    );
    const filteredArrivalAirports: Airport[] = airportsQuery.data?.airports?.filter(
      (airport: Airport) => airport.id !== selectedDepartureAirport
    );
  
    const [flightSearchParameters, setFlightSearchParameters] =
      useState<FlightSearchParameters>({
        departureAirportId: null,
        destinationAirportId: null,
        departureDate: null,
      });
  
    useEffect(() => {
      if (airportsQuery.data?.airports?.length > 1) {
        const defaultDepartureId = airportsQuery.data.airports[0].id;
        const defaultArrivalId = airportsQuery.data.airports[1].id;
  
        setFlightSearchParameters({
          departureAirportId: defaultDepartureId,
          destinationAirportId: defaultArrivalId,
          departureDate: getDatePartOfDate(new Date()),
        });
  
        setSelectedDepartureAirport(defaultDepartureId);
        setSelectedArrivalAirport(defaultArrivalId);
      }
    }, [airportsQuery.data]);
  
    const searchFlightsQuery = useSearchFlights(flightSearchParameters);
  
    const navigate = useNavigate();
  
    const handleDepartureChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const { name, value } = event.target;
      setSelectedDepartureAirport(Number(value));
      setFlightSearchParameters((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    };
  
    const handleArrivalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setSelectedArrivalAirport(Number(value));
      setFlightSearchParameters((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    };
  
    const handleDepartureDateChange = (date: Date | null) => {
      if (date) {
        setSelectedDepartureDate(date);
        setFlightSearchParameters((prevState) => ({
          ...prevState,
          ["departureDate"]: getDatePartOfDate(date),
        }));
      }
    };
  
    function getDatePartOfDate(date: Date) {
      return date.toISOString().split("T")[0];
    }
  
    return (
      <Box
        maxW="1200px"
        mx="auto"
        p={{ base: 3, md: 8 }}
        display="flex"
        flexDirection="column"
        gap={6}
      >
        {/* Search Form */}
        <VStack 
          spacing={4}
          align="stretch"
          p={4}
          rounded="md"
          boxShadow="md"
        >
          <FormControl>
            <FormLabel>Departure Airport</FormLabel>
            <Select
              value={selectedDepartureAirport || ""}
              onChange={handleDepartureChange}
              name="departureAirportId"
            >
              {filteredDepartureAirports?.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Arrival Airport</FormLabel>
            <Select
              value={selectedArrivalAirport || ""}
              onChange={handleArrivalChange}
              name="destinationAirportId">
              {filteredArrivalAirports?.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Departure Date</FormLabel>
            <DatePicker
              name="departureDate"
              selected={selectedDepartureDate}
              onChange={handleDepartureDateChange}
              dateFormat="yyyy-MM-dd"
            />
          </FormControl>
        </VStack>
  
        {/* Flights Table */}
        <Box overflowX="auto">
          <TableContainer>
            <Table variant="simple" size={{ base: "sm", md: "md" }}>
              <Thead>
                <Tr>
                  <Th>Flight Code</Th>
                  <Th>Departure</Th>
                  
                  <Show above="md">
                    <Th>Arrival</Th>
                    <Th>Departure Date</Th>
                    <Th>Completion Time</Th>
                  </Show>
                </Tr>
              </Thead>
              <Tbody>
                {searchFlightsQuery?.searchFlightsQuery?.data?.flights.map(
                  (flight: Flight) => (
                    <Tr
                      key={flight.id}
                      onClick={() => navigate(`/manage-flights/${flight.id}`)}
                      _hover={{ bg: "blue.500", cursor: "pointer" }}
                    >
                      <Td >{flight.flightCode}</Td>
                      <Td >{flight.departurePortNavigation.name}</Td>
                      <Show above="md">
                        <Td>{flight.arrivalPortNavigation.name}</Td>
                        <Td>{new Date(flight.departureTime).toLocaleString()}</Td>
                        <Td>{new Date(flight.completionTime).toLocaleString()}</Td>
                      </Show>
                      
                    </Tr>
                  )
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Flight Code</Th>
                  <Th>Departure</Th>
                  <Show above="sm">
                    <Th>Arrival</Th>
                    <Th>Departure Date</Th>
                    <Th>Completion Time</Th>
                  </Show>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };
  
  export default ManageFlights;
  