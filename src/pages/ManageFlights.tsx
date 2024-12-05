import {
    Box,
    FormControl,
    Select,
    FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Airport from "../types/airport";
import useAirports from "../hooks/useAirports";
import DatePicker from "react-datepicker";
import useSearchFlights from "../hooks/useSearchFlights";
import Flight from "../types/flight";
import FlightSearchParameters from "../types/flightSearchParameters";

const ManageFlights = () => {

    const { airportsQuery } = useAirports();
    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<number | null>(null);
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<number | null>(null);
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(new Date());

    const filteredDepartureAirports: Airport[] = airportsQuery.data?.airports?.filter((airport: Airport) => airport.id !== selectedArrivalAirport);
    const filteredArrivalAirports: Airport[] = airportsQuery.data?.airports?.filter((airport: Airport) => airport.id !== selectedDepartureAirport);
    
    const [flightSearchParameters, setFlightSearchParameters] = useState<FlightSearchParameters>({
        departureAirportId: 1,
        destinationAirportId: 2,
        departureDate: getDatePartOfDate(new Date)
    });

    const searchFlightsQuery = useSearchFlights(flightSearchParameters);

    const navigate = useNavigate();
    
  
    const handleDepartureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setSelectedDepartureAirport(Number(value));
      setFlightSearchParameters(prevState => ({
        ...prevState,
        [name]: Number(value)
      }))
    };

    const handleArrivalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
      setSelectedArrivalAirport(Number(value));
      setFlightSearchParameters(prevState => ({
        ...prevState,
        [name]: Number(value)
      }))
    };

    const handleDepartureDateChange = (date: Date | null) => {
        if (date) {
          setSelectedDepartureDate(date);
          setFlightSearchParameters(prevState => ({
            ...prevState,
            ["departureDate"]: getDatePartOfDate(date)
          }))  
        }     
    }

    function getDatePartOfDate(date: Date) {
        return date.toISOString().split("T")[0];
    }

    return (
        <>
        <Box height='80px'>
              <FormControl>
                <FormLabel>Departure</FormLabel>
                <Select
                  placeholder="Select airport"
                  value={selectedDepartureAirport || ""}
                  onChange={handleDepartureChange}
                  name="departureAirportId"
                >
                  {filteredDepartureAirports?.map(airport => (
                    <option key={airport.id} value={airport.id}>{airport.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box height='80px'>
              <FormControl>
                <FormLabel>Arrival</FormLabel>
                <Select
                  placeholder="Select airport"
                  value={selectedArrivalAirport || ""}
                  onChange={handleArrivalChange}
                  name="destinationAirportId"
                >
                  {filteredArrivalAirports?.map(airport => (
                    <option key={airport.id} value={airport.id}>{airport.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box height='80px'>
              <FormControl>
                <FormLabel>Departure Date</FormLabel>
                <DatePicker
                    name="departureDate"
                    value={selectedDepartureDate.toLocaleDateString()}
                    onChange={handleDepartureDateChange}
                />
              </FormControl>
            </Box>
            <Box>
                {searchFlightsQuery?.searchFlightsQuery?.data?.flights.map((flight: Flight) => (
                    <div key={flight.id} onClick={() => navigate("/manage-flights/" + flight.id)}>{flight.flightCode}</div>
                ))}
            </Box>
            </>     
    )
}

export default ManageFlights;