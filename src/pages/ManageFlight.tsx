import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateMutation } from "../hooks/useCreateMutation";
import React, { useState, useEffect } from "react";
import useFlight from "../hooks/useFlights";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
const ManageFlight = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    
    const queryClient = useQueryClient();
    const getTimeFromDateTime = (dateTimeString: string): string => {
        return dateTimeString.split("T")[1];
    };

    interface UpdateFlight {
        departureDateTime: Date
    }

    const marginTop = 4;
    const params = useParams();
    const { flightId } = params;
    const { flightQuery } = useFlight(flightId);
    const updateMutation = useCreateMutation<UpdateFlight>({ endpoint: `flights/${flightId}`, method: "PATCH", onSuccess: async() => {
        // Invalidating the query, triggering a refetch to get the updated flight
        await queryClient.invalidateQueries({
            queryKey: ['flight', flightId]
        })
    } });

    const deleteMutation = useCreateMutation<null>({ endpoint: `flights/${flightId}`, method: "DELETE", onSuccess: async() => {
        navigate("/manage-flights");
    } });

    const combineDateAndTime = (date: Date, time: string): Date => {
        const [hours, minutes] = time.split(":").map(Number);
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0, 0);
        return newDate;
    };

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

    const handleUpdateFlight = () => {
        if (selectedDepartureDate && selectedDepartureTime) {
            const departureDateTime = combineDateAndTime(selectedDepartureDate, selectedDepartureTime);
            updateMutation.mutate({ departureDateTime })
        }  
    }

    const handleDeleteFlight = () => {
        console.log("hello");
        deleteMutation.mutate(null);
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
        <>
        <div>
            <form>
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
            </form>
            <Button
                // REMEMBER THESE
                onClick={handleUpdateFlight}
                isDisabled={!formIsValid()}
                isLoading={false}
                mt={4}
                colorScheme='yellow'
                type='button'>
                Update flight
                </Button>
                <Button
                // REMEMBER THESE
                onClick={onOpen}
                isLoading={false}
                mt={4}
                colorScheme='red'
                type='button'>
                Delete flight
                </Button>
        </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warning</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           Are you sure you want to delete this flight?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteFlight}>
              Delete
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    );
};

export default ManageFlight;
