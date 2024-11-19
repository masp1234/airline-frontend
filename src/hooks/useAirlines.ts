import { useQuery } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";
import { useEffect } from "react";
import { useGetErrorToast } from "../toasts/getError";

const useAirlines = () => {
    const { fetchData } = useFetchData();
    const { showGetErrorToast } = useGetErrorToast();
    const airlinesQuery = useQuery({
        queryKey: ['airlines'],
        queryFn: async () => {
          return await fetchData("/airlines")
        }
      });
    
      useEffect(() => {
        if (airlinesQuery
          .isError) {
          showGetErrorToast("airlines");
        }
        }, [
        airlinesQuery.isError,
        showGetErrorToast,
      ]);
      return { airlinesQuery }
}

export default useAirlines;


