import { useQuery } from "@tanstack/react-query";
import ApiClient, { FlightResponse } from "../services/api-client";
import ms from "ms";
import { useAppSelector } from "./useRedux";


export interface FlightsAirline {
  id: number;
  name: string;
}

export interface PortNavigation {
  id: number;
  name: string;
  code: string;
  cityId: number;
  city: string;
}

export interface Flight {
  id: number;
  flightCode: string;
  departureTime: string;
  travelTime: number;
  kilometers: string;
  price: number;
  economyClassSeatsAvailable: number;
  firstClassSeatsAvailable: number;
  businessClassSeatsAvailable: number;
  flightsAirplane: string;
  departurePortNavigation: PortNavigation;
  arrivalPortNavigation: PortNavigation;
  flightsAirline: FlightsAirline;
}


// Instantiate the API client with the base path
const apiClient = new ApiClient<Flight>("/flights/search");



export const useFindFlight = (flightTrip: string | null) =>{
    const findFlightQuery = useAppSelector((state) => state.searchFlightData.data);
    const isReturn = flightTrip === "/find-ticket/return";
    const departureAirportId = isReturn
        ? findFlightQuery?.destinationAirportId ?? 1
        : findFlightQuery?.departureAirportId ?? 1;

    const destinationAirportId = isReturn
        ? findFlightQuery?.departureAirportId ?? 2
        : findFlightQuery?.destinationAirportId ?? 4;

    const departureDate = isReturn
        ? findFlightQuery?.returnDate ?? "2024-12-01"
        : findFlightQuery?.departureDate ?? "2024-11-21";

    return useQuery<FlightResponse<Flight>, Error>({
        queryKey: ["flights", flightTrip, findFlightQuery],
        queryFn: () =>
        apiClient.getAllFlightsBySearchData({
            params: {
            departureAirportId: findFlightQuery?.departureAirportId,
            destinationAirportId: findFlightQuery?.destinationAirportId,
            departureDate: findFlightQuery?.departureDate, 

            },
        }),
        staleTime: ms("1h"),
    });
}



export default useFindFlight;
