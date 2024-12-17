import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import Airline from "../types/airline";
import ms from "ms";

export interface AirlinesResponse {
  airlines: Airline[] 
}
const apiClient = new ApiClient<Airline, AirlinesResponse>(`/airlines`);

const useAirlines = () => {

    const airlinesQuery = useQuery<AirlinesResponse, Error>({
        queryKey: ['airlines'],
        queryFn: () => {
          return  apiClient.get()
        },
        staleTime: ms("30m"),
        gcTime: ms("60m")
      });

      return airlinesQuery 
}

export default useAirlines;


