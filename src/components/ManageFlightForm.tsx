import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Flight from "../types/flight";
import UpdateFlight from "../types/updateFlight";
import DatePicker from "react-datepicker";

interface ManageFlightFormProps {
    flight: Flight
    updateMutation: (updateFlight: UpdateFlight) => void;
    deleteMutation: () => void;
    deleteIsPending: boolean;
    updateIsPending: boolean;
}

const ManageFlightForm = (props: ManageFlightFormProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const marginTop = 4;
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
        console.log("hello");
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
        <form>
        <FormControl mt={marginTop}>
            <FormLabel>Flight code</FormLabel>
            <Input type='text' value={props.flight?.flightCode} readOnly={true}/>
        </FormControl>
        <FormControl mt={marginTop}>
            <FormLabel>Destination airport</FormLabel>
            <Input type='text' value={props.flight?.arrivalPortNavigation.name} readOnly={true}/>
        </FormControl>
        <FormControl mt={marginTop}>
            <FormLabel>Departure airport</FormLabel>
            <Input type='text' value={props.flight?.departurePortNavigation.name} readOnly={true}/>
        </FormControl>
        <FormControl mt={marginTop}>
            <FormLabel>Completion time</FormLabel>
            <Input type='text' value={props.flight?.completionTime.replace("T", " ")} readOnly={true}/>
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
        <div>
           
           <Button
               // REMEMBER THESE
               onClick={handleUpdateFlight}
               isDisabled={!formIsValid()}
               isLoading={props.updateIsPending}
               mt={4}
               colorScheme='yellow'
               type='button'>
               Update flight
               </Button>
               <Button
               // REMEMBER THESE
               onClick={onOpen}
               isLoading={props.deleteIsPending}
               mt={4}
               colorScheme='red'
               type='button'>
               Delete flight
               </Button>
       </div>
    </form>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Warning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        Are you sure you want to delete this flight?
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteFlight} isLoading={props.deleteIsPending}>
            Delete
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
            </Button>
        </ModalFooter>
        </ModalContent>
        </Modal>
        </>
    )
}

export default ManageFlightForm;