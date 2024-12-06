import { useQuery } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";
import FlightSearchParameters from "../types/flightSearchParameters";

const useSearchFlights = (searchParameters: FlightSearchParameters) => {
    const { fetchData } = useFetchData();

    const searchFlightsQuery = useQuery({
        queryKey: ['flights', searchParameters],
        queryFn: async () => {
            
            return await fetchData(
            `/flights/search?departureAirportId=${searchParameters.departureAirportId}&destinationAirportId=${searchParameters.destinationAirportId}&departureDate=${searchParameters.departureDate}`)
        },
        enabled: searchParameters.departureAirportId !== null &&
                 searchParameters.destinationAirportId !== null
                });
      return { searchFlightsQuery }
}

export default useSearchFlights;


