import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import Airplane from "../types/airplane";

interface AirplansResponse {
  airplanes: Airplane[]
}

const useAirplanes = () => {
    const apiClient = new ApiClient<Airplane, AirplansResponse>(`/airplanes`);
    const airplanesQuery = useQuery<AirplansResponse, Error>({
        queryKey: ['airplanes'],
        queryFn: () => {
          return  apiClient.get();
        }
      });
      return { airplanesQuery }
}

export default useAirplanes;