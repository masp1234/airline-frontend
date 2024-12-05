import {
    Flex,
    Grid,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Box,
    Stack,
    Text
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Flight from "../types/flight";
import UpdateFlight from "../types/updateFlight";
import DatePicker from "react-datepicker";
import ConfirmDialogBox from "./ConfirmDialogBox";

interface ManageFlightFormProps {
    flight: Flight;
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
            props.updateMutation({ departureDateTime });
        }
    };

    const handleDeleteFlight = () => {
        props.deleteMutation();
    };

    useEffect(() => {
            const { departureTime } = props.flight;
            setSelectedDepartureDate(new Date(departureTime));
            setSelectedDepartureTime(getTimeFromDateTime(departureTime));
    }, [props.flight]);

    const formIsValid = () => {
        return (
            selectedDepartureTime !== props.flight?.departureTime.substring(11) ||
            selectedDepartureDate?.toISOString().substring(0, 10) !== props.flight?.departureTime.substring(0, 10)
        );
    };

    const resetChanges = () => {
            const { departureTime } = props.flight;
            setSelectedDepartureDate(new Date(departureTime));
            setSelectedDepartureTime(getTimeFromDateTime(departureTime));
    
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
        <Box w="full" maxW="1200px" mx="auto" p={8}>
            <Stack spacing={6}>
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={6}>
                    <Text><strong>Flight Code:</strong> {props.flight.flightCode}</Text>
                    <Text><strong>Travel Time:</strong> {props.flight.travelTime}</Text>
                    <Text><strong>Departure Airport:</strong> {props.flight.departurePortNavigation.name}</Text>
                    <Text><strong>Destination Airport:</strong> {props.flight.arrivalPortNavigation.name}</Text>
                    <Text><strong>Completion Time:</strong> {props.flight.completionTime.replace("T", " ")}</Text>
                    <Text><strong>Distance:</strong> {props.flight.kilometers} km</Text>
                    <Text><strong>Base Price:</strong> {props.flight.price} EUR</Text>
                    <Text><strong>Airplane:</strong> {props.flight.flightsAirplane.name}</Text>
                    <Text><strong>Airline:</strong> {props.flight.flightsAirline.name}</Text>
                    <Text><strong>Economy class seats available:</strong> {props.flight.economyClassSeatsAvailable}</Text>
                    <Text><strong>Business class seats available:</strong> {props.flight.businessClassSeatsAvailable}</Text>
                    <Text><strong>First class seats available:</strong> {props.flight.firstClassSeatsAvailable}</Text>
                </Grid>

                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={6}
                >
                    <FormControl>
                        <FormLabel>Pick a departure date</FormLabel>
                        <DatePicker
                            selected={selectedDepartureDate}
                            onChange={handleDepartureDateChange}
                            dateFormat="yyyy-MM-dd"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Pick a departure time</FormLabel>
                        <Input
                            type="time"
                            value={selectedDepartureTime || ""}
                            onChange={handleDepartureTimeChange}
                        />
                    </FormControl>
                </Grid>
                <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={4} mt={5}>
                    <Button
                        onClick={onOpen}
                        isLoading={props.deleteIsPending}
                        colorScheme="red"
                        flexGrow={1}
                    >
                        Delete flight
                    </Button>
                    <Button
                        onClick={resetChanges}
                        colorScheme="blue"
                        isDisabled={!formIsValid()}
                        isLoading={props.updateIsPending}
                        flexGrow={1}
                    >
                        Reset changes
                    </Button>
                    <Button
                        onClick={handleUpdateFlight}
                        isDisabled={!formIsValid()}
                        isLoading={props.updateIsPending}
                        colorScheme="teal"
                        flexGrow={1}
                    >
                        Update flight
                    </Button>
                </Flex>       
            </Stack>

            <ConfirmDialogBox
                header="Warning"
                description="Are you sure you want to delete this flight?"
                confirmButtonText="Delete"
                confirmIsLoading={props.deleteIsPending}
                isOpen={isOpen}
                handleConfirmClick={handleDeleteFlight}
                onClose={onClose}
            />
        </Box>
    );
};

export default ManageFlightForm;
