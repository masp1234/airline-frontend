import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import { Checkbox } from '@chakra-ui/react';
import  { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { setSearchFlightData, clearSearchFlightData } from "../redux/searchFlightReduser.ts";
import { clearTicketData } from '../redux/ticketReduser';
import Airport from '../types/airport.ts';
import { useGetErrorToast } from "../toasts/getError.ts";
import useAirports from "../hooks/useAirports.ts";

const FlightSearchBox = () => {

  const airportsQuery  = useAirports();
  const navigate = useNavigate();
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(true);
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<number | null>(null);
  const [inputedPassengerAmount, setInputedPassengerAmount] = useState<number>(1);
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<number | null>(null);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(new Date());
  const [selectedReturnDate, setSelectedReturnDate] = useState<Date>(new Date());
  const { showGetErrorToast } = useGetErrorToast();

  useEffect(() => {
    if (airportsQuery
      .isError) {
      showGetErrorToast("airports");
    }
  },[airportsQuery.isError, showGetErrorToast,]);

  const filteredDepartureAirports: Airport[] = airportsQuery.data?.airports?.filter((airport: Airport) => airport.id !== selectedArrivalAirport) ?? [];

  const filteredArrivalAirports: Airport[] = airportsQuery.data?.airports?.filter((airport: Airport) => airport.id !== selectedDepartureAirport) ?? [];

  const handlePassengerAmount = (valueAsString: string,valueAsNumber: number) => {
    setInputedPassengerAmount(valueAsNumber);
  };
  const handleDepartureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const departureAiportId = Number(event.target.value);
    setSelectedDepartureAirport(departureAiportId);
  };
  const handleArrivalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const arrivalAirportId = Number(event.target.value);
    setSelectedArrivalAirport(arrivalAirportId);
  };
  const handleDepartureDateChange = (date: Date | null) => {
    if (date) {
        setSelectedDepartureDate(date);
    }    
  }
  const handleReturnDateChange = (date: Date | null) => {
    if (date) {
        setSelectedReturnDate(date);
    }    
  }
  const searchFlight = useAppSelector((state) => state.searchFlightData.data);

  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if(searchFlight !== null){
      dispatch(clearSearchFlightData())
    };
    
    dispatch(
      setSearchFlightData({
        isRoundTrip,
        departureAirportId: selectedDepartureAirport,
        destinationAirportId: selectedArrivalAirport,
        departureDate: selectedDepartureDate.toISOString().split('T')[0],
        returnDate: isRoundTrip ? selectedReturnDate.toISOString().split('T')[0]: null ,
        passenger: inputedPassengerAmount,
      })
    );
    dispatch(clearTicketData())
    navigate('find-ticket/departure');
  };
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      position="absolute"
      zIndex={1}
      display="flex"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Stack>
        <CardBody>
          <SimpleGrid columns={2} spacing={10}>
            <Box height='30px'>
              <Checkbox
                size='lg'
                isChecked={isRoundTrip}
                onChange={(e) => setIsRoundTrip(e.target.checked)}
              >
                Round Trip
              </Checkbox>
            </Box>
            <Box height='30px'>
              <HStack>
                <FormLabel>Passenger</FormLabel>
                <NumberInput
                  size='sm'
                  maxW={20}
                  min={1}
                  value={inputedPassengerAmount}
                  onChange={handlePassengerAmount}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </Box>
            <Box height='80px'>
              <FormControl>
                <FormLabel>Departure</FormLabel>
                <Select
                  placeholder="Select airport"
                  value={selectedDepartureAirport || ""}
                  onChange={handleDepartureChange}
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
                  value={selectedDepartureDate.toISOString().split('T')[0]}
                  onChange={handleDepartureDateChange}
                />
              </FormControl>
            </Box>
            <Box height='80px'>
              {isRoundTrip && (
                <FormControl>
                  <FormLabel>Return Date</FormLabel>
                  <DatePicker
                    value={selectedReturnDate.toISOString().split('T')[0]}
                    onChange={handleReturnDateChange}
                  />
                </FormControl>
              )}
            </Box>
          </SimpleGrid>
        </CardBody>
        <HStack>
          <CardFooter>
            <Button variant="solid" colorScheme="orange" onClick={handleSearch}>
              Search for Flights
            </Button>
          </CardFooter>
        </HStack>
      </Stack>
    </Card>
  );
};

export default FlightSearchBox;
