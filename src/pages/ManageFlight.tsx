import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useFlight from "../hooks/useFlights";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import DatePicker from "react-datepicker";

const ManageFlight = () => {
    const getTimeFromDateTime = (dateTimeString: string): string => {
        return dateTimeString.split("T")[1];
    };

    const marginTop = 4;
    const params = useParams();
    const { flightQuery } = useFlight(params.flightId);

    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date | null>(null);
    const [selectedDepartureTime, setSelectedDepartureTime] = useState<string | null>(null);

    useEffect(() => {
        if (flightQuery?.data?.data?.departureTime) {
            const { departureTime } = flightQuery.data.data
            setSelectedDepartureDate(new Date(departureTime));
            setSelectedDepartureTime(getTimeFromDateTime(departureTime))
        }
    }, [flightQuery?.data?.data]);

    const handleDepartureTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDepartureTime(event.target.value);
    };

    const handleDepartureDateChange = (date: Date | null) => {
        if (date) setSelectedDepartureDate(date);
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("hello");
    }

    const formIsValid = () => {
        // Checks that the date and time values do not match the original values. If either value is different, the form is valid.
        return selectedDepartureTime !== flightQuery?.data?.data?.departureTime.substring(11) || selectedDepartureDate?.toISOString().substring(0, 10) !== flightQuery?.data?.data?.departureTime.substring(0, 10);
    }

    if (flightQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (flightQuery.isError) {
        return <div>There was an error fetching the flight data.</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormControl mt={marginTop}>
                    <FormLabel>Flight code</FormLabel>
                    <Input type='text' value={flightQuery?.data?.data?.flightCode} readOnly={true}/>
                </FormControl>
                <FormControl mt={marginTop}>
                    <FormLabel>Destination airport</FormLabel>
                    <Input type='text' value={flightQuery?.data?.data?.arrivalPortNavigation.name} readOnly={true}/>
                </FormControl>
                <FormControl mt={marginTop}>
                    <FormLabel>Departure airport</FormLabel>
                    <Input type='text' value={flightQuery?.data?.data?.departurePortNavigation.name} readOnly={true}/>
                </FormControl>
                <FormControl mt={marginTop}>
                    <FormLabel>Completion time</FormLabel>
                    <Input type='text' value={flightQuery?.data?.data?.completionTime.replace("T", " ")} readOnly={true}/>
                </FormControl>
                <FormControl mt={marginTop}>
                    <FormLabel>Pick a departure date</FormLabel>
                    <DatePicker selected={selectedDepartureDate} onChange={handleDepartureDateChange} />
                </FormControl>
                <FormControl mt={marginTop}>
                    <FormLabel>Pick a departure time</FormLabel>
                    <input
                        aria-label="Time"
                        value={selectedDepartureTime || ""}
                        type="time"
                        onChange={handleDepartureTimeChange}
                    />
                </FormControl>

                <Button
                // REMEMBER THESE
                isDisabled={!formIsValid()}
                isLoading={false}
                mt={4}
                colorScheme='yellow'
                type='submit'>
                Submit
                </Button>
            </form>
        </div>
    );
};

export default ManageFlight;
