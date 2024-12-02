import { HStack, VStack, Text, Divider } from '@chakra-ui/react'
import { Ticket } from '../redux/ticketReduser';

interface Props {
    ticketInfo: Ticket;

  }
const TicketInfo = ({ticketInfo}: Props) => {
  return (
    <>
    <HStack  padding="10px">
        <VStack>
            <Text fontSize='2xl' marginBottom='-15px'>{ticketInfo.departureTime}</Text>
            <Text fontSize='sm' marginBottom='-15px'>{ticketInfo?.departurePortNavigation}</Text>
            <Text fontSize='sm'>Terminal 2</Text>
        </VStack>
        <VStack>
            <Divider orientation='horizontal' w='475px' />
            <Text fontSize='sm'>0 Stops</Text>
        </VStack>
                    
        <VStack>
            <Text fontSize='2xl' marginBottom='-15px'>{ticketInfo?.arrivalTime}</Text>
            <Text fontSize='sm' marginBottom='-15px'>{ticketInfo?.arrivalPortNavigation}</Text>
            <Text fontSize='sm'>Terminal 3</Text>
        </VStack>
    </HStack>
    <Text fontSize='sm' marginLeft='10px'>Duration {ticketInfo?.duration}</Text>
    <Text fontSize='sm' marginLeft='10px'>Operated By {ticketInfo?.flightsAirline}</Text>
    </>
  )
}

export default TicketInfo
