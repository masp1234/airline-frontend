import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import Airplane from "../types/airplane";
import ms from "ms";

interface AirplansResponse {
  airplanes: Airplane[]
}
const apiClient = new ApiClient<Airplane, AirplansResponse>(`/airplanes`);

const useAirplanes = () => {
    const airplanesQuery = useQuery<AirplansResponse, Error>({
        queryKey: ['airplanes'],
        queryFn: () => {
          return  apiClient.get();
        },
        staleTime: ms("30m"),
        gcTime: ms("60m")
      });
      return  airplanesQuery 
}

export default useAirplanes;