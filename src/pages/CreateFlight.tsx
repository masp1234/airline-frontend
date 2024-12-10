import "react-datepicker/dist/react-datepicker.css";
import { Container } from '@chakra-ui/react'
import CreateFlightForm from "../components/CreateFlightForm.tsx";
import useAirlines from "../hooks/useAirlines.ts";
import useAirplanes from "../hooks/useAirplanes.ts";
import useAirports from "../hooks/useAirports.ts";

const CreateFlight = () => {

    const  airlinesQuery  = useAirlines();
    const  airplanesQuery  = useAirplanes();
    const  airportsQuery  = useAirports();

    return (
      <>
          <Container>
            <CreateFlightForm
            airlines={airlinesQuery?.data?.airlines ?? []}
            airplanes={airplanesQuery?.data?.airplanes ?? []}
            airports={airportsQuery?.data?.airports ?? []}
            />
          </Container>
      </>
    )
  }

export default CreateFlight;
