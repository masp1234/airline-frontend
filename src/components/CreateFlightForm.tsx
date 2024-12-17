import React, { useState } from "react";
import { 
    FormControl,
    FormLabel,
    Button,
} from '@chakra-ui/react'
import { useResourceCreatedToast } from "../toasts/resourceCreated.ts";
import { useResourceCreatedErrorToast } from "../toasts/resourceCreatedError.ts";
import DatePicker from "react-datepicker";
import FormSelect from "./FormSelect";
import Airline from "../types/airline.ts"
import Airplane from '../types/airplane.ts';
import Airport from '../types/airport.ts';
import { useCreateMutation } from "../hooks/useCreateMutation.ts";
import NewFlightInformation from "../types/newFlightInformation.ts";

interface CreateFlightFormProps {
    airlines: Airline[];
    airplanes: Airplane[];
    airports: Airport[];
}

const CreateFlightForm = (props: CreateFlightFormProps) => {

    const marginTop = 4;

    const { showResourceCreatedToast } = useResourceCreatedToast();
    const { showResourceCreatedErrorToast } = useResourceCreatedErrorToast();

    const resetForm = () => {
        setSelectedAirline(null);
        setSelectedAirplane(null);
        setSelectedDepartureAirport(null);
        setSelectedArrivalAirport(null);
        setSelectedDepartureDate(new Date());
        setSelectedDepartureTime(null);
        setIdempotencyKey("");
    };

    const  newFlightMutation  = useCreateMutation<NewFlightInformation>({
        endpoint: "flights", 
        method: "POST", 
        onSuccess: () => {
            resetForm();
            showResourceCreatedToast("flight");
    },
        onError: () => {
            showResourceCreatedErrorToast("flight");
        }
 });

    const [idempotencyKey, setIdempotencyKey] = useState<string>("");
    const [selectedAirline, setSelectedAirline] = useState<number | null>(null);
    const [selectedAirplane, setSelectedAirplane] = useState<number | null>(null);
    const [selectedDepartureAirport, setSelectedDepartureAirport] = useState<number | null>(null);
    const [selectedArrivalAirport, setSelectedArrivalAirport] = useState<number | null>(null);
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(new Date());
    const [selectedDepartureTime, setSelectedDepartureTime] = useState<string | null>(null);
    
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
                <FormSelect
                items={props.airlines}
                label="Select airline"
                value={selectedAirline}
                setter={setSelectedAirline}
                marginTop={marginTop}/>

                <FormSelect
                items={props.airplanes}
                label="Select airplane"
                value={selectedAirplane}
                setter={setSelectedAirplane}
                marginTop={marginTop}/>

                <FormSelect
                items={filteredDepartureAirports}
                label="Select departure airport"
                value={selectedDepartureAirport}
                setter={setSelectedDepartureAirport}
                marginTop={marginTop}/>

                <FormSelect
                items={filteredArrivalAirports}
                label="Select destination airport"
                value={selectedArrivalAirport}
                setter={setSelectedArrivalAirport}
                marginTop={marginTop}/>

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