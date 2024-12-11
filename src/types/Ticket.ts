import Passenger from "./passenger";

export interface Ticket{
    passenger: Passenger | null,
    flightId: number | null,
    flightClassId: number | null,
    ticketNumber: string | null,
    price: number | null,
    flightCode: string | null,
    departurePortName: string | null,
    arrivalPortName: string | null,
    flightClassName: string | null,
    passengerFirstName: string | null,
    passengerLastName: string | null,
    passengerEmail: string | null,
    flightTravelTime: number | null,
}