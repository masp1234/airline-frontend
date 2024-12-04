import { useMutation } from "@tanstack/react-query";
import BASE_URL from "../util/baseUrl";

interface UseDeleteMutationOptions {
  endpoint: string;
  onSuccess?: () => void;
  onError?: () => void
}

export const useDeleteMutation = ({ endpoint, onSuccess, onError }: UseDeleteMutationOptions) => {

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    },
    onSuccess: onSuccess,
    onError: onError
  });
};