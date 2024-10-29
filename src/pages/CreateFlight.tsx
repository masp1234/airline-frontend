import "react-datepicker/dist/react-datepicker.css";

import { Container, Select} from '@chakra-ui/react'
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
    
    const { fetchData } = useFetchData();
    

    const [selectedAirline, setSelectedAirline] = useState<number | null>(null);
    const [selectedAirplane, setSelectedAirplane] = useState<number | null>(null);
    const [selectedDeparture, setSelectedDeparture] = useState<number | null>(null);
    const [selectedArrival, setSelectedArrival] = useState<number | null>(null);
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(new Date());

    const handleAirplaneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const airplaneId = Number(event.target.value);
        setSelectedAirplane(airplaneId);
    }

    const handleDepartureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const departureAiportId = Number(event.target.value);
        setSelectedDeparture(departureAiportId);
    };
    
    const handleArrivalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const arrivalAirportId = Number(event.target.value);
        setSelectedArrival(arrivalAirportId);
    };
    
    
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
    const filteredDepartureAirports = departureAirports.filter(airport => airport.id !== selectedArrival);
    const filteredArrivalAirports = arrivalAirports.filter(airport => airport.id !== selectedDeparture);

  return (
    <>
        <Container>
            <Select placeholder='Select airline'>
                {airlines.map(airline => <option key={airline.id}>{airline.name}</option>)}
            </Select>
            <Select placeholder='Select airplane' onChange={handleAirplaneChange}>
                {airplanes.map(airplane => <option key={airplane.id}>{airplane.name}</option>)}
                
            </Select>
            <Select placeholder='Select departure airport' onChange={handleDepartureChange} value={selectedDeparture || undefined}>
                {filteredDepartureAirports.map(airport => (
                    <option key={airport.id} value={airport.id}>{airport.name}</option>
                ))}
            </Select>
            <Select placeholder='Select arrival airport' onChange={handleArrivalChange} value={selectedArrival || undefined}>
                {filteredArrivalAirports.map(airport => (
                <option key={airport.id} value={airport.id}>{airport.name}</option>
                ))}
            </Select>
            <DatePicker selected={selectedDepartureDate} onChange={(date) => date && setSelectedDepartureDate(date)} />
        </Container>
    </>
  )
}

export default CreateFlight
