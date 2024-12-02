import { useQuery } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";
import { useEffect } from "react";
import { useGetErrorToast } from "../toasts/getError";



const useAirports = () => {
    const { fetchData } = useFetchData();
    const { showGetErrorToast } = useGetErrorToast();
    const airportsQuery = useQuery({
        queryKey: ['airports'],
        queryFn: async () => {
          return await fetchData("/airports")
        }
      });
    
      useEffect(() => {
        if (airportsQuery
          .isError) {
          showGetErrorToast("airports");
        }
        }, [
        airportsQuery.isError,
        showGetErrorToast,
      ]);
      return { airportsQuery }
}

export default useAirports;