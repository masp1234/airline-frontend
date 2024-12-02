import { Ticket } from "./Ticket";

export  interface Booking{
    email: string | null,
    tickets: Ticket []| null,
}
