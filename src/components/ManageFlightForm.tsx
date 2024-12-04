import {
    Flex,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Flight from "../types/flight";
import UpdateFlight from "../types/updateFlight";
import DatePicker from "react-datepicker";
import ConfirmDialogBox from "./ConfirmDialogBox";

interface ManageFlightFormProps {
    flight: Flight
    updateMutation: (updateFlight: UpdateFlight) => void;
    deleteMutation: () => void;
    deleteIsPending: boolean;
    updateIsPending: boolean;
}

const ManageFlightForm = (props: ManageFlightFormProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date | null>(null);
    const [selectedDepartureTime, setSelectedDepartureTime] = useState<string | null>(null);

    const handleDepartureTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDepartureTime(event.target.value);
    };
    
    const handleDepartureDateChange = (date: Date | null) => {
        if (date) setSelectedDepartureDate(date);
    };
    
    const handleUpdateFlight = () => {
        if (selectedDepartureDate && selectedDepartureTime) {
            const departureDateTime = combineDateAndTime(selectedDepartureDate, selectedDepartureTime);
            props.updateMutation({ departureDateTime })
        }  
    }

    const handleDeleteFlight = () => {
        props.deleteMutation();
    }

    useEffect(() => {
        if (props.flight?.departureTime) {
            const { departureTime } = props.flight;
            setSelectedDepartureDate(new Date(departureTime));
            setSelectedDepartureTime(getTimeFromDateTime(departureTime))
        }
    }, [props.flight]);

    const formIsValid = () => {
        // Checks that the date and time values do not match the original values. If either value is different, the form is valid.
        return selectedDepartureTime !== props.flight?.departureTime.substring(11) || selectedDepartureDate?.toISOString().substring(0, 10) !== props.flight?.departureTime.substring(0, 10);
    }

    const combineDateAndTime = (date: Date, time: string): Date => {
        const [hours, minutes] = time.split(":").map(Number);
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0, 0);
        return newDate;
    };

    const getTimeFromDateTime = (dateTimeString: string): string => {
        return dateTimeString.split("T")[1];
    };

    return (
        <>
        <Flex flexDirection={"column"}>
                <Flex flexDirection={"row"} gap={6} justifyContent={"space-around"}>
                    <FormControl >
                        <FormLabel>Flight code</FormLabel>
                        <Input type='text' value={props.flight.flightCode} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Destination airport</FormLabel>
                        <Input type='text' value={props.flight.arrivalPortNavigation.name} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Departure airport</FormLabel>
                        <Input type='text' value={props.flight.departurePortNavigation.name} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Completion time</FormLabel>
                        <Input type='text' value={props.flight.completionTime.replace("T", " ")} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Pick a departure date</FormLabel>
                        <DatePicker selected={selectedDepartureDate} onChange={handleDepartureDateChange} />
                    </FormControl>
                </Flex>
                
                <Flex flexDirection={"row"} gap={6} justifyContent={"space-around"}>
                    <FormControl>
                        <FormLabel>Pick a departure time</FormLabel>
                        <input
                            aria-label="Time"
                            value={selectedDepartureTime || ""}
                            type="time"
                            onChange={handleDepartureTimeChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Flight time</FormLabel>
                        <Input type='text' value={props.flight.travelTime} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Flight distance in kilometers</FormLabel>
                        <Input type='text' value={props.flight.kilometers} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Base price per ticket</FormLabel>
                        <Input type='text' value={props.flight.price} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Economy class seats available</FormLabel>
                        <Input type='text' value={props.flight.economyClassSeatsAvailable} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Business class seats available</FormLabel>
                        <Input type='text' value={props.flight.businessClassSeatsAvailable} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>First class seats available</FormLabel>
                        <Input type='text' value={props.flight.firstClassSeatsAvailable} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Airplane name</FormLabel>
                        <Input type='text' value={props.flight.flightsAirplane.name} readOnly={true}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Airline name</FormLabel>
                        <Input type='text' value={props.flight.flightsAirline.name} readOnly={true}/>
                    </FormControl>
                </Flex>

             


            
        </Flex>

        <Flex>
            <Button
                onClick={handleUpdateFlight}
                isDisabled={!formIsValid()}
                isLoading={props.updateIsPending}
                mt={4}
                colorScheme='yellow'
                type='button'>
                Update flight
            </Button>
            <Button
                onClick={onOpen}
                isLoading={props.deleteIsPending}
                mt={4}
                colorScheme='red'
                type='button'>
                Delete flight
            </Button>
        </Flex>

        <ConfirmDialogBox 
                header="Warning" 
                description="Are you sure you want to delete this flight?" 
                confirmButtonText="Delete"
                confirmIsLoading={props.deleteIsPending}
                isOpen={isOpen}
                handleConfirmClick={handleDeleteFlight}
                onClose={onClose}
            ></ConfirmDialogBox>
            </>
    )
}

export default ManageFlightForm;