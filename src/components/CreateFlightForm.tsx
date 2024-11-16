import React, { useState } from "react";
import { 
    Select,
    FormControl,
    FormLabel,
    Button,
} from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import useNewFlightMutation from "../hooks/useNewFlightMutation.ts";
import Airline from "../types/airline.ts"
import Airplane from '../types/airplane.ts';
import Airport from '../types/airport.ts';

interface CreateFlightFormProps {
    airlines: Airline[];
    airplanes: Airplane[];
    airports: Airport[];
}

const CreateFlightForm = (props: CreateFlightFormProps) => {

    const marginTop = 4;

    const resetForm = () => {
        setSelectedAirline(null);
        setSelectedAirplane(null);
        setSelectedDepartureAirport(null);
        setSelectedArrivalAirport(null);
        setSelectedDepartureDate(new Date());
        setSelectedDepartureTime(null);
        setIdempotencyKey("");
    };

    const { newFlightMutation } = useNewFlightMutation(resetForm);

    const [idempotencyKey, setIdempotencyKey] = useState<string>("");
    const [selectedAirline, setSelectedAirline] = useState<number | null>(null);
    const [selectedAirplane, setSelectedAirplane] = useState<number | null>(null);
    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<number | null>(null);
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<number | null>(null);
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(new Date());
    const [selectedDepartureTime, setSelectedDepartureTime] = useState<string | null>(null);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, setter: (value: number) => void) => {
        const value = Number(event.target.value);
        setter(value);
      }
  
      const handleDepartureDateChange = (date: Date | null) => {
          if (date) {
              setSelectedDepartureDate(date);
          }    
      }
  
      const handleDepartureTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const departureTime = event.target.value;
          setSelectedDepartureTime(departureTime);
      }

    const formIsValid = 
      !selectedAirline ||
      !selectedAirplane ||
      !selectedDepartureAirport ||
      !selectedArrivalAirport ||
      !selectedDepartureDate ||
      !selectedDepartureTime

    // Filter out selected airports from the other list
    const filteredDepartureAirports: Airport[] = props.airports?.filter((airport: Airport) => airport.id !== selectedArrivalAirport);
    const filteredArrivalAirports: Airport[] = props.airports?.filter((airport: Airport) => airport.id !== selectedDepartureAirport);

    const handleSubmit = (event: React.SyntheticEvent) => {
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
        newFlightMutation.mutate(newFlightInformation);
    }
}

    return (
        <form onSubmit={handleSubmit}>
                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Airline</FormLabel>
                    <Select placeholder='Select airline' value={selectedAirline || ""} onChange={(event) => handleSelectChange(event, setSelectedAirline)}>
                    {props.airlines?.map((airline: Airline) => (
                      <option key={airline.id} value={airline.id}>{airline.name}</option>
                    ))}
                    </Select>
                </FormControl>
                
                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Airplane</FormLabel>
                    <Select placeholder='Select airplane' value={selectedAirplane || ""} onChange={(event) => handleSelectChange(event, setSelectedAirplane)}>
                        {props.airplanes?.map((airplane: Airplane) => <option key={airplane.id} value={airplane.id}>{airplane.name}</option>)}
                    </Select>
                </FormControl>

                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Departure airport</FormLabel>
                    <Select placeholder='Select departure airport'
                    value={selectedDepartureAirport || ""} onChange={(event) => handleSelectChange(event, setSelectedDepartureAirport)}>
                        {filteredDepartureAirports?.map(airport => (
                            <option key={airport.id} value={airport.id}>{airport.name}</option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl isRequired mt={marginTop}>
                    <FormLabel>Destination airport</FormLabel>
                    <Select placeholder='Select arrival airport' value={selectedArrivalAirport || ""} onChange={(event) => handleSelectChange(event, setSelectedArrivalAirport)}>
                        {filteredArrivalAirports?.map(airport => (
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
                isDisabled={formIsValid}
                isLoading={newFlightMutation.isPending}
                mt={4}
                colorScheme='teal'
                type='submit'>
                Submit
                </Button>
            </form>
    )
}

export default CreateFlightForm;