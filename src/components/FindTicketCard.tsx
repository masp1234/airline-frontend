import {Card, Divider, Grid, GridItem, HStack, VStack, Text, Button,} from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { clearDepartureTicket, clearReturnTicketData, setDepartureTicket, setReturnTicketData } from '../redux/ticketReduser';
import { SelectedTicket } from '../pages/FindTicket';
import Flight from '../types/flight';

interface Props {
    flight: Flight;
    flightTrip: string| null;
    selectedTicket: SelectedTicket | null;
    onSendData: (data: SelectedTicket) => void;
  }



const FindTicketCard = ({onSendData, selectedTicket, flight , flightTrip}: Props) => {
    const departureTime = new Date(flight.departureTime);
    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(departureTime.getMinutes() + flight.travelTime);
    const durationHours = Math.floor(flight.travelTime / 60);
    const durationMinutes = flight.travelTime % 60;
    const durationTime = durationHours + " h. " + durationMinutes + durationMinutes + " m. ";


    const ticketInfo = useAppSelector((state) => state.ticketData.data);
    const findFlightQuery = useAppSelector((state) => state.searchFlightData.data);
    const dispatch = useAppDispatch();
    const handleSelectedDepartureTicket = (flightClassId: number, flightId: number, price: number) => {
        if(ticketInfo?.departureTicket !== null) {
            dispatch(clearDepartureTicket());
        };
        dispatch(
            setDepartureTicket({
                flightId: flightId ,
                flightClassId: flightClassId ,
                passenger: findFlightQuery?.passenger ?? 1,
                price: price,
                departureTime: departureTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                arrivalTime: arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                duration: durationTime ,
                flightsAirplane: flight.flightsAirline.name,
                flightsAirline: flight.flightsAirline.name,
                departurePortNavigation: flight.departurePortNavigation.code,
                arrivalPortNavigation: flight.arrivalPortNavigation.code,

            })
        );
        onSendData({flightId: flightId, selectedSeat: flightClassId })

    };
    const handleSelectedReturnTicket = (flightClassId: number, flightId: number, price: number) => {
        if(ticketInfo?.returnTicket !== null) {
            dispatch(clearReturnTicketData());
        };
        dispatch(
            setReturnTicketData({
                flightId: flightId ,
                flightClassId: flightClassId ,
                passenger: findFlightQuery?.passenger ?? 1,
                price: price,
                departureTime: departureTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                arrivalTime: arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                duration: durationTime ,
                flightsAirplane: flight.flightsAirline.name,
                flightsAirline: flight.flightsAirline.name,
                departurePortNavigation: flight.departurePortNavigation.code,
                arrivalPortNavigation: flight.arrivalPortNavigation.code,

            })
        );
        onSendData({flightId: flightId, selectedSeat: flightClassId })


    };
    const handleSelectedTicket = (flightClassId: number, flightId: number, price: number) => {
        if(flightTrip=== '/find-ticket/return'){
            handleSelectedReturnTicket(flightClassId, flightId, price )
        }else{
            handleSelectedDepartureTicket(flightClassId, flightId, price )
        }
        
    };

  return (
    <Card w= '90%'  variant="outline" boxShadow='md' bg="blackAlpha.200" key={flight.id}>
        <Grid
        h={{base: '400px', md: '200px'}}
        templateRows='repeat(4, 1fr)'
        templateColumns='repeat(7, 1fr)'
        >
            <GridItem colSpan={{base: 7, md: 4}} rowSpan={2} >
                <HStack  padding="10px">
                    <VStack>
                        <Text fontSize='2xl' marginBottom='-15px'>{departureTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                        <Text fontSize='sm' marginBottom='-15px'>{flight.departurePortNavigation.code}</Text>
                        <Text fontSize='sm'>Terminal 2</Text>
                    </VStack>
                    <VStack>
                        <Divider orientation='horizontal' w={{base: '150px' ,  sm:'350px' ,md: '150px', lg: '300px'}} />
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
           
            <GridItem rowSpan={2} colSpan={{base: 2, md: 1}} >
                <VStack padding='10px' >
                    <Text fontSize={{base: 'lg', md: 'xl', lg: '2xl'}}>Economy</Text>
                    <Text fontSize={{base: 'xs', md: 'sm', lg: 'm'}}>{flight.price} €</Text>
                    <Text fontSize={{base: 'xs', md: 'sm', lg: 'm'}}>{flight.economyClassSeatsAvailable} Seats Availabe </Text>
                    
                    <Button colorScheme='teal' variant={selectedTicket?.selectedSeat === 1 && selectedTicket.flightId === flight.id ? 'solid': 'outline'} onClick={() => handleSelectedTicket(1, flight.id, flight.price )}>Select</Button>

                </VStack>

            </GridItem>
            <GridItem rowSpan={2} colSpan={{base: 2, md: 1}} >
            <VStack padding='10px' >
                    <Text fontSize={{base: 'lg', md: 'xl', lg: '2xl'}}>Business</Text>
                    <Text fontSize={{base: 'xs', md: 'sm', lg: 'm'}}>{flight.price + 99} €</Text>
                    <Text fontSize={{base: 'xs', md: 'sm', lg: 'm'}}>{flight.businessClassSeatsAvailable} Seats Availabe </Text>
                    <Button colorScheme='teal' variant={selectedTicket?.selectedSeat === 2 && selectedTicket.flightId === flight.id ? 'solid': 'outline'} onClick={() => handleSelectedTicket(2, flight.id, flight.price + 99)}>Select</Button>
                    

                </VStack>
            </GridItem>
            <GridItem rowSpan={2}  colSpan={{base: 2, md: 1}}>
            <VStack padding='10px' >
                    <Text fontSize={{base: 'lg', md: 'xl', lg: '2xl'}}>FirstClass</Text>
                    <Text fontSize={{base: 'xs', md: 'sm', lg: 'm'}}>{flight.price + 149} €</Text>
                    <Text fontSize={{base: 'xs', md: 'sm', lg: 'm'}}>{flight.firstClassSeatsAvailable} Seats Availabe </Text>
                    <Button colorScheme='teal' variant={selectedTicket?.selectedSeat === 3 && selectedTicket.flightId === flight.id ? 'solid': 'outline'} onClick={() => handleSelectedTicket(3, flight.id, flight.price + 149)}>Select</Button>
                    

                    
                </VStack>
            </GridItem>
            
        </Grid>
    </Card>
  )
}

export default FindTicketCard
