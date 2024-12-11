import { VStack, Text, Button} from '@chakra-ui/react';
import useFindFlight from '../hooks/useFindFlight';

import FindTicketCard from '../components/FindTicketCard';
import { useNavigate, useLocation } from 'react-router-dom';
import  { useState, useEffect } from "react";
import { useAppSelector } from '../hooks/useRedux';
import Flight from '../types/flight';


export interface SelectedTicket {
    flightId: number | null,
    selectedSeat: number | null
}

const FindTicket = () => {
    const [flightTrip, setFlightTrip] = useState<string | null >("");
    const [selectedTicket, setSelectedTicket] = useState<SelectedTicket | null >();


    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setFlightTrip( location.pathname);
        window.scrollTo({ top: 0, behavior: "smooth" });

    },[location.pathname]);

    const { data, isLoading, error } = useFindFlight(flightTrip);
    const searchFlight = useAppSelector((state) => state.searchFlightData.data);

    if (isLoading) return <Text>Loading flights...</Text>;

    if (error) return <Text>Error fetching flights: {error.message}</Text>;

    const flights = data?.flights || [];


    const handleNextOnClick = () => {
        const nextPath = searchFlight?.isRoundTrip 
        ? (flightTrip === '/find-ticket/departure' ? '/find-ticket/return' : '/booking')
        : '/booking';

    navigate(nextPath);
        
    }
    
  return (
    <VStack>
        <Text fontSize='5xl'>Please select your {flightTrip === '/find-ticket/return'? 'Return': 'Departure'}</Text>
        <Text fontSize='3xl'>
            {flights[0]?.departurePortNavigation.name} to {flights[0]?.arrivalPortNavigation.name}
        </Text>
        {flights?.map((flight: Flight) =>(
            <FindTicketCard key={flight.id} flight={flight} flightTrip= {flightTrip} selectedTicket={selectedTicket || { flightId: null, selectedSeat: null }} onSendData={setSelectedTicket}/> 
        ))}
        <Button colorScheme='teal' m='5px' w={40} onClick={handleNextOnClick}>Next</Button>

    </VStack>
  )
}

export default FindTicket
