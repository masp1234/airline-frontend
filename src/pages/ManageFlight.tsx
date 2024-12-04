import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateMutation } from "../hooks/useCreateMutation";
import { useDeleteMutation } from "../hooks/useDeleteMutation";
import useFlight from "../hooks/useFlights";
import ManageFlightForm from "../components/ManageFlightForm";
import UpdateFlight from "../types/updateFlight";
import { useResourceCreatedErrorToast } from "../toasts/resourceCreatedError";

const ManageFlight = () => {
    
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { showResourceCreatedErrorToast } = useResourceCreatedErrorToast();
    const params = useParams();
    const { flightId } = params;
    const { flightQuery } = useFlight(flightId);
    const updateMutation = useCreateMutation<UpdateFlight>({ endpoint: `flights/${flightId}`, method: "PATCH", onSuccess: async() => {
        // Invalidating the query, triggering a refetch to get the updated flight
        await queryClient.invalidateQueries({
            queryKey: ['flight', flightId]
        })
    } });

    const deleteMutation = useDeleteMutation(
        { 
            endpoint: `flights/${flightId}` , 
            onSuccess: async() => navigate("/manage-flights"), 
            onError: () => showResourceCreatedErrorToast("flight")
        });

    if (flightQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (flightQuery.isError) {
        return <div>There was an error fetching the flight data.</div>;
    }

    return (
        <>
       
      <ManageFlightForm flight={flightQuery?.data?.data} updateMutation={updateMutation.mutate} deleteMutation={deleteMutation.mutate} deleteIsPending={deleteMutation.isPending} updateIsPending={updateMutation.isPending}>

      </ManageFlightForm>
      </>
    );
};

export default ManageFlight;
