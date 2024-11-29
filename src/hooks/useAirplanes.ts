import { useQuery } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";
import { useEffect } from "react";
import { useGetErrorToast } from "../toasts/getError";

const useAirplanes = () => {
    const { fetchData } = useFetchData();
    const { showGetErrorToast } = useGetErrorToast();
    const airplanesQuery = useQuery({
        queryKey: ['airplanes'],
        queryFn: async () => {
          return await fetchData("/airplanes")
        }
      });
    
      useEffect(() => {
        if (airplanesQuery
          .isError) {
          showGetErrorToast("airplanes");
        }
        }, [
        airplanesQuery.isError,
        showGetErrorToast,
      ]);
      return { airplanesQuery }
}

export default useAirplanes;