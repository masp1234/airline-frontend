export default interface SearchFlight {
    isRoundTrip: boolean | null;
    passenger: number | null;
    departureAirport: number | null;
    arrivalAirport: number | null;
    departureDate: string;
    returnDate: string | null;

};
