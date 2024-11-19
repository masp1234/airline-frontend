import { useMutation } from "@tanstack/react-query";
import BASE_URL from "../util/baseUrl.ts";
import NewFlightInformation from "../types/newFlightInformation";
import { useResourceCreatedToast } from "../toasts/resourceCreated";
import { useResourceCreatedErrorToast } from "../toasts/resourceCreatedError"

const useNewFlightMutation = (onSucces: () => void) => {
    const { showResourceCreatedToast } = useResourceCreatedToast();
    const { showResourceCreatedErrorToast } = useResourceCreatedErrorToast();

    const newFlightMutation = useMutation({
        mutationFn: async (newFlight: NewFlightInformation) => {
          const response = await fetch(`${BASE_URL}/flights`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFlight),
            credentials: "include"
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }
        return response.json();
        }
        ,
        onSuccess: () => {
          showResourceCreatedToast("flight");
          onSucces();
        },
        onError: () => {
          showResourceCreatedErrorToast("flight");
        } 
      });
      
      return { newFlightMutation };
}

export default useNewFlightMutation;

