import { VStack, Text, Button} from '@chakra-ui/react';
import useFindFlight from '../hooks/useFindFlight';
import FindTicketCard from '../components/FindTicketCard';
import { useNavigate, useLocation } from 'react-router-dom';
import  { useState, useEffect } from "react";
import { useAppSelector } from '../hooks/useRedux';


  

const FindTicket = () => {
    const [flightTrip, setFlightTrip] = useState<string | null >("");

    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setFlightTrip( location.pathname);
        
    },[location.pathname]);

    const { data, isLoading, error } = useFindFlight(flightTrip);
    const searchFlight = useAppSelector((state) => state.searchFlightData.data);

    if (isLoading) return <Text>Loading flights...</Text>;

    if (error) return <Text>Error fetching flights: {error.message}</Text>;

    const flights = data?.data || [];

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
            {flights[0].departurePortNavigation.name} to {flights[0].arrivalPortNavigation.name}
        </Text>
        {flights?.map((flight) =>(
            <FindTicketCard key={flight.id} flight={flight} flightTrip= {flightTrip}/> 
        ))}
        <Button colorScheme='teal' onClick={handleNextOnClick}>Next</Button>
    </VStack>
  )
}

export default FindTicket
