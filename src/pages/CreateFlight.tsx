import "react-datepicker/dist/react-datepicker.css";
import BASE_URL from "../util/baseUrl.ts";
import { useResourceCreatedToast } from "../toasts/resourceCreated.ts";
import { useResourceCreatedErrorToast } from "../toasts/resourceCreatedError.ts";

import { 
    Container,
    Select,
    FormControl,
    FormLabel,
    Button
} from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import Airline from "../types/airline.ts"
import Airplane from '../types/airplane.ts';
import Airport from '../types/airport.ts';
import { useFetchData } from "../hooks/useFetchData.ts"
import DatePicker from "react-datepicker";

const CreateFlight = () => {
    
    const [airlines, setAirlines] = useState<Airline[]>([]);
    const [airplanes, setAirplanes] = useState<Airplane[]>([]);
    const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);
    const [arrivalAirports, setArrivalAirports] = useState<Airport[]>([]);

    const marginTop = 4;
    const { fetchData } = useFetchData();
    const { showResourceCreatedToast } = useResourceCreatedToast();
    const { showResourceCreatedErrorToast } = useResourceCreatedErrorToast();
    
    const [selectedAirline, setSelectedAirline] = useState<number | null>(null);
    const [selectedAirplane, setSelectedAirplane] = useState<number | null>(null);
    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<number | null>(null);
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<number | null>(null);
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(new Date());
    const [selectedDepartureTime, setSelectedDepartureTime] = useState<string | null>(null);

    const handleSubmitFlight = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (selectedDepartureTime) {
            const [hours, minutes] = selectedDepartureTime.split(":").map(Number);
            const departureDateTime = new Date(selectedDepartureDate);
            departureDateTime.setHours(hours);
            departureDateTime.setMinutes(minutes);
            const newFlightInformation = {
                airlineId: selectedAirline,
                airplaneId: selectedAirplane,
                departureAirport: selectedDepartureAirport,
                arrivalAirport: selectedDepartureAirport,
                departureTime: departureDateTime,
            }
            try {
                const response = await fetch(`${BASE_URL}/flights`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newFlightInformation),
                    credentials: "include"
                });
    
                if (response.status === 201) {
                    showResourceCreatedToast("flight");
                }
                else if (response.status === 500) {
                    showResourceCreatedErrorToast("flight");
                }
            }
            catch {
                showResourceCreatedErrorToast("flight");
            }
        }        
    }

    const handleAirlineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const airlineId = Number(event.target.value);
        setSelectedAirline(airlineId);
    }

    const handleAirplaneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const airplaneId = Number(event.target.value);
        setSelectedAirplane(airplaneId);
    }

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
    const handleDepartureTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const departureTime = event.target.value;
        console.log(departureTime);
        setSelectedDepartureTime(departureTime);
    }
     
    useEffect(() => {
        async function fetchAll() {
            fetchData<Airline>("./src/data/airlines.json", setAirlines, "airlines");
            fetchData<Airplane>("./src/data/airplanes.json", setAirplanes, "airplanes");
            const airportData = await fetchData<Airport>("./src/data/airports.json", setDepartureAirports, "airports");
            setArrivalAirports(airportData);
            }

            fetchAll();

    }, [])

    // Filter out selected airports from the other list
    const filteredDepartureAirports = departureAirports.filter(airport => airport.id !== selectedArrivalAirport);
    const filteredArrivalAirports = arrivalAirports.filter(airport => airport.id !== selectedDepartureAirport);

  return (
    <>
        <Container>
            <form onSubmit={handleSubmitFlight}>
                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Airline</FormLabel>
                    <Select placeholder='Select airline' onChange={handleAirlineChange}>
                        {airlines.map(airline => <option key={airline.id} value={airline.id}>{airline.name}</option>)}
                    </Select>
                </FormControl>
                
                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Airplane</FormLabel>
                    <Select placeholder='Select airplane' onChange={handleAirplaneChange}>
                        {airplanes.map(airplane => <option key={airplane.id} value={airplane.id}>{airplane.name}</option>)}
                        
                    </Select>
                </FormControl>

                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Departure airport</FormLabel>
                    <Select placeholder='Select departure airport' onChange={handleDepartureChange} value={selectedDepartureAirport || undefined}>
                        {filteredDepartureAirports.map(airport => (
                            <option key={airport.id} value={airport.id}>{airport.name}</option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Destination airport</FormLabel>
                    <Select placeholder='Select arrival airport' onChange={handleArrivalChange} value={selectedArrivalAirport || undefined}>
                        {filteredArrivalAirports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.name}</option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Pick a departure date</FormLabel>
                    <DatePicker selected={selectedDepartureDate} onChange={handleDepartureDateChange} />
                </FormControl>
                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Pick a departure time</FormLabel>
                    <input aria-label="Time" type="time" onChange={handleDepartureTimeChange} />  
                </FormControl>
                <Button
                isDisabled=
                {
                    !selectedAirline ||
                    !selectedAirplane ||
                    !selectedDepartureAirport ||
                    !selectedArrivalAirport ||
                    !selectedDepartureDate ||
                    !selectedDepartureTime
                }
                mt={4}
                colorScheme='teal'
                type='submit'>
                Submit
                </Button>
            </form>
        </Container>
    </>
  )
}

export default CreateFlight
