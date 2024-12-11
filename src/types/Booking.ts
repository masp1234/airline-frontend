import { Ticket } from "./Ticket";

export  interface Booking{
    confirmationNumber: string | null,
    email: string | null,
    tickets: Ticket []| null,
}
