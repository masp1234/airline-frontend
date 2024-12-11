import { Ticket } from "./Ticket";

export  interface Booking{
    id: number | null,
    confirmationNumber: string | null,
    email: string | null,
    tickets: Ticket []| null,
}
