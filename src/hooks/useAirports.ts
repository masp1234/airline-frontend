import { useQuery } from "@tanstack/react-query";
import Airport from "../types/airport";
import ApiClient from "../services/api-client";
import ms from "ms";

interface AirportsResponse {
  airports: Airport[]
}
const apiClient = new ApiClient<Airport, AirportsResponse>(`/airports`);

const useAirports = () => {
    const airportsQuery = useQuery<AirportsResponse, Error>({
        queryKey: ['airports'],
        queryFn: () => {
          return apiClient.get();
        },
        staleTime: ms("30m"),
        gcTime: ms("60m")
      });

    return airportsQuery 
}

export default useAirports;