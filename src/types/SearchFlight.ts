export default interface SearchFlight {
    isRoundTrip: boolean | null;
    passenger: number | null ;
    departureAirportId: number | null;
    destinationAirportId: number | null;
    departureDate: string;
    returnDate: string | null;

};
