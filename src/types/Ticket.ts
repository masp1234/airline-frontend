import Passenger from "./passenger";

export interface Ticket{
    passenger: Passenger | null,
    flightId: number | null,
    flightClassId: number | null,
}