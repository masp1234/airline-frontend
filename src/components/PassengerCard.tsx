import { FormControl, FormLabel, Input, HStack, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react"
import Passenger from "../types/passenger";
import { useEffect, useState } from "react";

interface Props {
    onSendData: (data: Passenger) => void;
    passengerNumber: number;
}

const PassengerCard = ({ onSendData, passengerNumber }: Props) => {
    const [passenger, setPassenger] = useState<Passenger>();
    const [firstName, setFirstName] = useState<string | null>('');
    const [lastName, setLastName] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');

    useEffect(() => {
        if (firstName && lastName && email) {
            const newPassenger: Passenger = {
                firstName,
                lastName,
                email,
            };
            setPassenger(newPassenger);
        }
    }, [firstName, lastName, email]);

    
    useEffect(() => {
        if (passenger) {
            onSendData(passenger);
        }
    }, [passenger, onSendData]);
  return (
    <HStack>
    <Card variant='outline' m='2'>
        <CardHeader>
            <Heading size='md'>{passengerNumber}. Passenger</Heading>
        </CardHeader>
        <CardBody>
            <HStack>
            <FormControl mt='4' isRequired>
                <FormLabel>First Name</FormLabel>
                <Input onChange={(e)=> setFirstName(e.target.value)}/>
            </FormControl>
            <FormControl mt='4' isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input onChange={(e)=> setLastName(e.target.value)} />
            </FormControl>
            <FormControl mt='4' isRequired>
                <FormLabel >Email address</FormLabel>
                <Input type='email' onBlur= {(e)=> setEmail(e.target.value)} />
            </FormControl>
            </HStack>
        </CardBody>
    </Card>
</HStack>
  )
}

export default PassengerCard
