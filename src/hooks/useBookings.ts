import { useQuery } from "@tanstack/react-query";
import { Booking } from "../types/Booking";
import { useEffect } from "react";
import ApiClient from "../services/api-client";
import { useGetErrorToast } from "../toasts/getError";
import ms from "ms";

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
    staleTime: ms("10m"),
    gcTime: ms("20")
  });

  useEffect(() => {
    if (bookingsQuery.isError) {
      showGetErrorToast("booking");
    }
  }, [bookingsQuery.isError, showGetErrorToast]);
  return { bookingsQuery };
};

export default useBookings;
