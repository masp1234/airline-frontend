import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@tanstack/react-query";
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
import NewFlightInformation from "../types/newFlightInformation.ts";
import { useFetchData } from "../hooks/useFetchData.ts"
import DatePicker from "react-datepicker";

const CreateFlight = () => {
    const marginTop = 4;

    const mutation = useMutation({
      mutationFn: async (newFlight: NewFlightInformation) => {
        const response = await fetch(`${BASE_URL}/flights`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newFlight),
          credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }
      return response.json();
      }
      ,
      onSuccess: () => {
        showResourceCreatedToast("flight");
        resetForm();
      },
      onError: () => {
        showResourceCreatedErrorToast("flight");
      } 
    })

    const { fetchData } = useFetchData();
    const { showResourceCreatedToast } = useResourceCreatedToast();
    const { showResourceCreatedErrorToast } = useResourceCreatedErrorToast();

    const [idempotencyKey, setIdempotencyKey] = useState<string>("");
    
    const [airlines, setAirlines] = useState<Airline[]>([]);
    const [airplanes, setAirplanes] = useState<Airplane[]>([]);
    const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);
    const [arrivalAirports, setArrivalAirports] = useState<Airport[]>([]);
    
    const [selectedAirline, setSelectedAirline] = useState<number | null>(null);
    const [selectedAirplane, setSelectedAirplane] = useState<number | null>(null);
    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<number | null>(null);
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<number | null>(null);
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(new Date());
    const [selectedDepartureTime, setSelectedDepartureTime] = useState<string | null>(null);

    const resetForm = () => {
        setSelectedAirline(null);
        setSelectedAirplane(null);
        setSelectedDepartureAirport(null);
        setSelectedArrivalAirport(null);
        setSelectedDepartureDate(new Date());
        setSelectedDepartureTime(null);
        setIdempotencyKey("");
    };

    const handleSubmitFlight = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        let key = idempotencyKey;
        if (!key || key === "") {
          key = crypto.randomUUID();
          setIdempotencyKey(key);
        }

        if (selectedDepartureTime) {
            const [hours, minutes] = selectedDepartureTime.split(":").map(Number);
            const departureDateTime = new Date(selectedDepartureDate);
            departureDateTime.setHours(hours);
            departureDateTime.setMinutes(minutes);
            const newFlightInformation = {
                airlineId: selectedAirline,
                airplaneId: selectedAirplane,
                departureAirportId: selectedDepartureAirport,
                arrivalAirportId: selectedArrivalAirport,
                departureDateTime,
                idempotencyKey: key
            }

            mutation.mutate(newFlightInformation);
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
        setSelectedDepartureTime(departureTime);
    }
     
    useEffect(() => {
        async function fetchAll() {
            const data = await Promise.all([
              fetchData<Airline>("./src/data/airlines.json", setAirlines, "airlines"),
              fetchData<Airplane>("./src/data/airplanes.json", setAirplanes, "airplanes"),
              fetchData<Airport>("./src/data/airports.json", setDepartureAirports, "airports")
            ])
            setArrivalAirports(data[2]);
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
                    <Select placeholder='Select airline' value={selectedAirline || ""} onChange={handleAirlineChange}>
                        {airlines.map(airline => <option key={airline.id} value={airline.id}>{airline.name}</option>)}
                    </Select>
                </FormControl>
                
                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Airplane</FormLabel>
                    <Select placeholder='Select airplane' value={selectedAirplane || ""} onChange={handleAirplaneChange}>
                        {airplanes.map(airplane => <option key={airplane.id} value={airplane.id}>{airplane.name}</option>)}
                        
                    </Select>
                </FormControl>

                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Departure airport</FormLabel>
                    <Select placeholder='Select departure airport'
                    value={selectedDepartureAirport || ""} onChange={handleDepartureChange}>
                        {filteredDepartureAirports.map(airport => (
                            <option key={airport.id} value={airport.id}>{airport.name}</option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Destination airport</FormLabel>
                    <Select placeholder='Select arrival airport' value={selectedArrivalAirport || ""} onChange={handleArrivalChange}>
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
                    <input aria-label="Time" value={selectedDepartureTime || ""} type="time" onChange={handleDepartureTimeChange} />  
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

export default CreateFlight;
