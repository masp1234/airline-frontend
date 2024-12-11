import CreateBookingTicket from "./createBookingTicket";

export default interface CreateBookingInformation {
    email: string | null,
    tickets: CreateBookingTicket[]| null,
}