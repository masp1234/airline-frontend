import { useQuery } from "@tanstack/react-query";
import { Booking } from "../types/Booking";
import { useEffect } from "react";
import ApiClient from "../services/api-client";
import { useGetErrorToast } from "../toasts/getError";

interface BookingsResponse {
  data: Booking[];
}

const useBookings = (email: string | null | undefined) => {
  const apiClient = new ApiClient<Booking, BookingsResponse>(
    `/users/${email}/bookings`
  );
  const { showGetErrorToast } = useGetErrorToast();
  const bookingsQuery = useQuery({
    queryKey: ["bookings", email],
    queryFn: async () => {
      const response = await apiClient.get();
      return response.data || [];
    },
  });

  useEffect(() => {
    if (bookingsQuery.isError) {
      showGetErrorToast("booking");
    }
  }, [bookingsQuery.isError, showGetErrorToast]);
  return { bookingsQuery };
};

export default useBookings;
