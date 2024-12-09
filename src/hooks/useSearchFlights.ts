import { useQuery } from "@tanstack/react-query";
import FlightSearchParameters from "../types/flightSearchParameters";
import ApiClient from "../services/api-client";
import { Flight, FlightsResposne } from "./useFindFlight";

const useSearchFlights = (searchParameters: FlightSearchParameters) => {
    //const { fetchData } = useFetchData();
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
            && searchParameters.destinationAirportId !== 0
                });
      return { searchFlightsQuery }
}

export default useSearchFlights;


