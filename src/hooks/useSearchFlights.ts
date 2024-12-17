import { useQuery } from "@tanstack/react-query";
import FlightSearchParameters from "../types/flightSearchParameters";
import ApiClient from "../services/api-client";
import { FlightsResposne } from "./useFindFlight";
import Flight from "../types/flight";
import ms from "ms";

const useSearchFlights = (searchParameters: FlightSearchParameters) => {
    const apiClient = new ApiClient<Flight, FlightsResposne>("/flights/search");
    const searchFlightsQuery = useQuery<FlightsResposne, Error>({
        queryKey: ['flights', searchParameters],
        queryFn: async () => { 
            
            return  apiClient.get({
                params: {
                departureAirportId: searchParameters.departureAirportId,
                destinationAirportId: searchParameters.destinationAirportId,
                departureDate: searchParameters.departureDate,
                },
            }
           )
        },
        enabled: 
            searchParameters.departureAirportId !== null && 
            searchParameters.departureAirportId !== 0 &&
            searchParameters.destinationAirportId !== null 
            && searchParameters.destinationAirportId !== 0,
            staleTime: ms("2m"),
            gcTime: ms("4m")
                });
      return { searchFlightsQuery }
}

export default useSearchFlights;


