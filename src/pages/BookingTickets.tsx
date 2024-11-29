import { useEffect, useState } from "react";
import PassengerCard from "../components/PassengerCard";
import Passenger from "../types/passenger";
import { SimpleGrid, Box, Card,Text, VStack, Button, } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import TicketInfo from "../components/TicketInfo";
import {useMutation} from "@tanstack/react-query";
import { Booking } from "../types/Booking";
//import BASE_URL from "../util/baseUrl";
import { useResourceCreatedToast } from "../toasts/resourceCreated.ts";
import { useResourceCreatedErrorToast } from "../toasts/resourceCreatedError.ts";
import { Ticket } from "../types/Ticket.ts";
import { clearSearchFlightData } from "../redux/searchFlightReduser.ts";
import { clearTicketData } from "../redux/ticketReduser.ts";


const BookingTickets = () => {
    const { showResourceCreatedToast } = useResourceCreatedToast();
    const { showResourceCreatedErrorToast } = useResourceCreatedErrorToast();
    const dispatch = useAppDispatch();

    //const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [passenger, setPassenger] = useState<Passenger>();
    const ticketInfo = useAppSelector((state) => state.ticketData.data);

    useEffect(() => {
        if (passenger && ticketInfo?.departureTicket) {
            const flightId = ticketInfo?.departureTicket?.flightId;
            const flightClassId = ticketInfo?.departureTicket?.flightClassId;
            setTickets((prevPassengers) => [...prevPassengers, {passenger, flightId: flightId , flightClassId: flightClassId}]);  // Automatically send the updated passengers list
        }
        if (passenger && ticketInfo?.returnTicket) {
            const flightId = ticketInfo?.returnTicket?.flightId;
            const flightClassId = ticketInfo?.returnTicket?.flightClassId;
            setTickets((prevPassengers) => [...prevPassengers, {passenger, flightId: flightId , flightClassId: flightClassId}]);  // Automatically send the updated passengers list
        }
    }, [passenger, ticketInfo]);

    
    const createTicketMutation = useMutation({
        mutationFn: async (newBooking: Booking) => {
          const response = await fetch(`http://localhost:5224/api/mysql/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBooking),
            credentials: "include"
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }
        
        return response.json();
        },
        onSuccess: () => {
            setTickets([]);
            dispatch(clearSearchFlightData(), clearTicketData());
          showResourceCreatedToast("booking");
        },
        onError: () => {
          showResourceCreatedErrorToast("booking");
          console.log()
        } 
      })
    
      const handleSubmitBooking = async (event: React.SyntheticEvent)=>{
        event.preventDefault();
        
        const newBooking = {
            email: "john.doe1@example.com",
            tickets: tickets
        }
        createTicketMutation.mutate(newBooking);
    }
  return (
    <>
    <SimpleGrid columns={2} spacing={10}>
        <form onSubmit={handleSubmitBooking}>
            <Box  >
                
                {Array(ticketInfo?.departureTicket?.passenger).fill(null).map((_, index) => (
                    <PassengerCard key={index} passengerNumber={index + 1}  onSendData={setPassenger} />
                ))}
                <Button mt={4} colorScheme='teal' type='submit'> Submit Booking</Button>
                
            </Box>
        </form>
        <Box  >
            {ticketInfo?.departureTicket && (
                <Card variant='outline' m='2' p='4'>
                    <Text fontSize='4xl'> Your Departure Ticket</Text>
                    <VStack>
                        <TicketInfo ticketInfo={ticketInfo?.departureTicket} />
                        <Text> Amount: {ticketInfo?.departureTicket.price} €</Text>
                    </VStack>
                </Card>
            )}
            {ticketInfo?.returnTicket && (
                <Card variant='outline' m='2' p='4'>
                    <Text fontSize='4xl'> Your Return Ticket</Text>
                    <VStack>
                        <TicketInfo ticketInfo={ticketInfo?.returnTicket} />
                        <Text mb='4'> Amount: {ticketInfo?.returnTicket.price} €</Text>
                    </VStack>
                </Card>
            )}
            <Text mb="4" fontSize='xl'>
                Total Amount:  {(ticketInfo?.departureTicket?.price ?? 0) +
                 (ticketInfo?.returnTicket?.price ?? 0)} €
            </Text>
            
        </Box>
        
    </SimpleGrid>
    </> 
  )
}

export default BookingTickets
