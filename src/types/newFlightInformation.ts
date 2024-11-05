export default interface NewFlightInformation {
    airlineId: number | null;
    airplaneId: number | null;
    departureAirportId: number | null;
    arrivalAirportId: number | null;
    departureDateTime: Date;
    idempotencyKey: string;
};
