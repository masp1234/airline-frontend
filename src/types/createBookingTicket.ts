import Passenger from "./passenger";

export default interface CreateBookingTicket {
    passenger: Passenger | null,
    flightId: number | null,
    flightClassId: number | null,
}