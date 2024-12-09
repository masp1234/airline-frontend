import { useMutation } from "@tanstack/react-query";
import { Method } from "axios";
import { useResourceCreatedToast } from "../toasts/resourceCreated";
import { useResourceCreatedErrorToast } from "../toasts/resourceCreatedError";
import ApiClient from "../services/api-client";

interface UseCreateMutationOptions {
  endpoint: string;
  method: Method;
  onSuccess: () => void;
}

export const useCreateMutation = <T>({ endpoint, method, onSuccess }: UseCreateMutationOptions) => {
    const apiClient = new ApiClient<T>(`/${endpoint}`);
    const { showResourceCreatedToast } = useResourceCreatedToast();
    const { showResourceCreatedErrorToast } = useResourceCreatedErrorToast();

  return useMutation({
    mutationFn: async (newObject: T) => {
      return apiClient.create(newObject, method)
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