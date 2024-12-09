import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import Airline from "../types/airline";

export interface AirlinesResponse {
  airlines: Airline[] 
}
const apiClient = new ApiClient<Airline, AirlinesResponse>(`/airlines`);

const useAirlines = () => {

    const airlinesQuery = useQuery<AirlinesResponse, Error>({
        queryKey: ['airlines'],
        queryFn: () => {
          return  apiClient.get()
        }
      });

      return airlinesQuery 
}

export default useAirlines;


