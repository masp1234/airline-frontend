import { useQuery } from "@tanstack/react-query";
import Airport from "../types/airport";
import ApiClient from "../services/api-client";

interface AirportsResponse {
  airports: Airport[]
}
const apiClient = new ApiClient<Airport, AirportsResponse>(`/airports`);

const useAirports = () => {
    const airportsQuery = useQuery<AirportsResponse, Error>({
        queryKey: ['airports'],
        queryFn: () => {
          return apiClient.get();
        }
      });


    return airportsQuery 
}

export default useAirports;