import Airport from "./airport";
import Airplane from "./airplane";
import Airline from "./airline";

export default interface Flight {
    id: number;
    flightCode: string;
    departureTime: string;
    completionTime: string;
    travelTime: number;
    kilometers: string;
    price: number;
    economyClassSeatsAvailable: number;
    businessClassSeatsAvailable: number;
    firstClassSeatsAvailable: number;
    arrivalPortNavigation: Airport;
    departurePortNavigation: Airport;
    flightsAirline: Airline;
    flightsAirplane: Airplane;
}