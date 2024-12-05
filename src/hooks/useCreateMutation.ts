import { useMutation } from "@tanstack/react-query";
import BASE_URL from "../util/baseUrl";
import { useResourceCreatedToast } from "../toasts/resourceCreated";
import { useResourceCreatedErrorToast } from "../toasts/resourceCreatedError";

interface UseCreateMutationOptions {
  endpoint: string;
  method: string;
  onSuccess: () => void;
}

export const useCreateMutation = <T>({ endpoint, method, onSuccess }: UseCreateMutationOptions) => {
    const { showResourceCreatedToast } = useResourceCreatedToast();
    const { showResourceCreatedErrorToast } = useResourceCreatedErrorToast();

  return useMutation({
    mutationFn: async (newObject: T) => {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObject),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    },
    onSuccess: () => {
        showResourceCreatedToast(endpoint);
        onSuccess();
    },
    onError: () => {
        showResourceCreatedErrorToast(endpoint);
    },
  });
};