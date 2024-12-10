import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useGetErrorToast } from "../toasts/getError";
import ApiClient from "../services/api-client";
import Flight from "../types/flight";

export interface FlightResposne {
  data: Flight;
}


const useFlight = (flightId: string | undefined) => {
    const apiClient = new ApiClient<Flight, FlightResposne>(`/flights/${flightId}`);
    const { showGetErrorToast } = useGetErrorToast();
    const flightQuery = useQuery({
        queryKey: ['flight', flightId],
        queryFn: async () => {
          return apiClient.get();
        }
      });
    
      useEffect(() => {
        if (flightQuery
          .isError) {
          showGetErrorToast("flight");
        }
        }, [
        flightQuery.isError,
        showGetErrorToast,
      ]);
      return { flightQuery }
}

export default useFlight;