import {Card, Divider, Grid, GridItem, HStack, VStack, Text, Button,} from '@chakra-ui/react';
import { Flight } from "../hooks/useFindFlight";
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { clearDepartureTicket, clearReturnTicketData, setDepartureTicket, setReturnTicketData } from '../redux/ticketReduser';
import { useState } from 'react';
//import SeatClassButton from './seatClassButton';

interface Props {
    flight: Flight;
    flightTrip: string| null;
  }

const FindTicketCard = ({ flight , flightTrip}: Props) => {
    const [selectedSeat, setSelectedSeat] = useState<number | null >(0);
    const departureTime = new Date(flight.departureTime);
    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(departureTime.getMinutes() + flight.travelTime);
    const durationHours = Math.floor(flight.travelTime / 60);
    const durationMinutes = flight.travelTime % 60;

    const ticketInfo = useAppSelector((state) => state.ticketData.data);
    console.log(ticketInfo?.departureTicket)
    const findFlightQuery = useAppSelector((state) => state.searchFlightData.data);
    const dispatch = useAppDispatch();
    const handleSelectedDepartureTicket = (flightClassId: number, flightId: number) => {
        if(ticketInfo?.departureTicket !== null) {
            dispatch(clearDepartureTicket());
        };
        dispatch(
            setDepartureTicket({
                flightId: flightId ,
                flightClassId: flightClassId ,
                passenger: findFlightQuery?.passenger ?? 1,
            })
        );
        setSelectedSeat(flightClassId)

    };
    const handleSelectedReturnTicket = (flightClassId: number, flightId: number) => {
        if(ticketInfo?.returnTicket !== null) {
            dispatch(clearReturnTicketData());
        };
        dispatch(
            setReturnTicketData({
                flightId: flightId ,
                flightClassId: flightClassId ,
                passenger: findFlightQuery?.passenger ?? 1,
            })
        );
        setSelectedSeat(flightClassId)

    };
    const handleSelectedTicket = (flightClassId: number, flightId: number) => {
        if(flightTrip=== '/find-ticket/return'){
            handleSelectedReturnTicket(flightClassId, flightId )
        }else{
            handleSelectedDepartureTicket(flightClassId, flightId )
        }
        
    };

  return (
    <Card w= '90%'  variant="outline" boxShadow='md' bg="blackAlpha.200" key={flight.id}>
        <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(7, 1fr)'
        >
            <GridItem colSpan={4} rowSpan={2} >
                <HStack  padding="10px">
                    <VStack>
                        <Text fontSize='2xl' marginBottom='-15px'>{departureTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                        <Text fontSize='sm' marginBottom='-15px'>{flight.departurePortNavigation.code}</Text>
                        <Text fontSize='sm'>Terminal 2</Text>
                    </VStack>
                    <VStack>
                        <Divider orientation='horizontal' w='475px' />
                        <Text fontSize='sm'>0 Stops</Text>
                    </VStack>
                    
                    <VStack>
                        <Text fontSize='2xl' marginBottom='-15px'>{arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                        <Text fontSize='sm' marginBottom='-15px'>{flight.arrivalPortNavigation.code}</Text>
                        <Text fontSize='sm'>Terminal 3</Text>
                    </VStack>
                </HStack>
                <Text fontSize='sm' marginLeft='10px'>Duration {durationHours}h {durationMinutes !== 0 && durationMinutes + 'm'}</Text>
                <Text fontSize='sm' marginLeft='10px'>Operated By {flight.flightsAirline.name}</Text>
            </GridItem>
           
            <GridItem rowSpan={2} colSpan={1} >
                <VStack padding='10px' >
                    <Text fontSize='2xl'>Economy</Text>
                    <Text>{flight.price} €</Text>
                    <Text>{flight.economyClassSeatsAvailable} Seats Availabe </Text>
                    
                    <Button colorScheme='teal' variant={selectedSeat==1? 'solid': 'outline'} onClick={() => handleSelectedTicket(1, flight.id)}>Select</Button>
                    

                    
                </VStack>

            </GridItem>
            <GridItem rowSpan={2}  >
            <VStack padding='10px' >
                    <Text fontSize='2xl'>Business</Text>
                    <Text>{flight.price + 99} €</Text>
                    <Text>{flight.businessClassSeatsAvailable} Seats Availabe </Text>
                    <Button colorScheme='teal' variant={selectedSeat==2? 'solid': 'outline'} onClick={() => handleSelectedTicket(2, flight.id)}>Select</Button>
                    

                </VStack>
            </GridItem>
            <GridItem rowSpan={2}  >
            <VStack padding='10px' >
                    <Text fontSize='2xl'>First Class</Text>
                    <Text>{flight.price + 149} €</Text>
                    <Text>{flight.firstClassSeatsAvailable} Seats Availabe </Text>
                    <Button colorScheme='teal' variant={selectedSeat==3? 'solid': 'outline'} onClick={() => handleSelectedTicket(3, flight.id)}>Select</Button>
                    

                    
                </VStack>
            </GridItem>
            
        </Grid>
    </Card>
  )
}

export default FindTicketCard
