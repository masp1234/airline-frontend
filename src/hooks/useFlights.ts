import { useQuery } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";
import { useEffect } from "react";
import { useGetErrorToast } from "../toasts/getError";

const useFlight = (flightId: string | undefined) => {
    const { fetchData } = useFetchData();
    const { showGetErrorToast } = useGetErrorToast();
    const flightQuery = useQuery({
        queryKey: ['flight', flightId],
        queryFn: async () => {
          return await fetchData(`/flights/${flightId}`)
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