import { useQuery } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";
import { useEffect } from "react";
import { useGetErrorToast } from "../toasts/getError";
import useUserStore from "../store";

const useBookings = () => {
    const { fetchData } = useFetchData();
    const { showGetErrorToast } = useGetErrorToast();
    const email = useUserStore((state) => state.email);
    const bookingsQuery = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
          const response = await fetchData(`/users/${email}/bookings`);
          return response.data;
        }
      });

      useEffect(() => {
        if (bookingsQuery.isError) {
          showGetErrorToast("bookings");
        }
      }, [bookingsQuery.isError, showGetErrorToast]);

      return { bookingsQuery };
};

export default useBookings;