import { useQuery } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";
import { useEffect } from "react";
import { useGetErrorToast } from "../toasts/getError";



const useBookings = () => {
    const { fetchData } = useFetchData();
    const { showGetErrorToast } = useGetErrorToast();
    const bookingsQuery = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
          return await fetchData("/api/mysql/users/{email}/bookings")
        }
      });
    
      useEffect(() => {
        if (bookingsQuery
          .isError) {
          showGetErrorToast("bookings");
        }
        }, [
        bookingsQuery.isError,
        showGetErrorToast,
      ]);
      return { bookingsQuery }
}

export default useBookings;