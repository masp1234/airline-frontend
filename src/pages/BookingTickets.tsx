import { useEffect, useState } from "react";
import PassengerCard from "../components/PassengerCard";
import Passenger from "../types/passenger";
import { SimpleGrid, Box, Card,Text, VStack, Button, Show, } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import TicketInfo from "../components/TicketInfo";
import { Ticket } from "../types/Ticket.ts";
import { clearSearchFlightData } from "../redux/searchFlightReduser.ts";
import { clearTicketData } from "../redux/ticketReduser.ts";
import { useCreateMutation } from "../hooks/useCreateMutation.ts";
import { Booking } from "../types/Booking.ts";


const BookingTickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [passenger, setPassenger] = useState<Passenger>();
    const ticketInfo = useAppSelector((state) => state.ticketData.data);
    const userEmail = useAppSelector((state) => state.loginUserData.data?.email);
    const dispatch = useAppDispatch();    

    const resetTickets = () =>{
        setTickets([]);
        dispatch(clearSearchFlightData(), clearTicketData());
    }
    const { mutate} = useCreateMutation<Booking>({endpoint: "bookings", method: "POST", onSuccess: resetTickets});
    
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

    

    
      const handleSubmitBooking = async (event: React.SyntheticEvent)=>{
        event.preventDefault();
        
        const newBooking = {
            email: userEmail || null ,
            tickets: tickets
        }
        mutate(newBooking);
    }

  return (
    <>
    <Show above='970px'>
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
                        <Text fontSize={{base: 'lg', md: '2xl', lg: '4xl'}}> Your Departure Ticket</Text>
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
                    Total Amount:  {((ticketInfo?.departureTicket?.price ?? 0) +
                    (ticketInfo?.returnTicket?.price ?? 0)) * (ticketInfo?.departureTicket?.passenger ?? 1)} €

                </Text>
                
            </Box>
            
        </SimpleGrid>
    </Show>
    <Show breakpoint='(max-width: 969px)'>
        <Box>
            <Box  >
                {ticketInfo?.departureTicket && (
                    <Card variant='outline' m='2' p='4'>
                        <Text fontSize={{base: 'lg', md: '2xl', lg: '4xl'}}> Your Departure Ticket</Text>
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
                    Total Amount:  {((ticketInfo?.departureTicket?.price ?? 0) +
                    (ticketInfo?.returnTicket?.price ?? 0)) * (ticketInfo?.departureTicket?.passenger ?? 1)} €

                </Text>
                
            </Box>
            <form onSubmit={handleSubmitBooking}>
                <Box  >
                    {Array(ticketInfo?.departureTicket?.passenger).fill(null).map((_, index) => (
                        <PassengerCard key={index} passengerNumber={index + 1}  onSendData={setPassenger} />
                    ))}
                    <Button mt={4} colorScheme='teal' type='submit'> Submit Booking</Button>
                </Box>
                
            </form>
        </Box>
    </Show>

    </> 
  )
}

export default BookingTickets
