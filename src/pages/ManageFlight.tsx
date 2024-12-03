import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFlight from "../hooks/useFlights";
import { FormControl, FormLabel } from "@chakra-ui/react";
import DatePicker from "react-datepicker";

const ManageFlight = () => {
    const getTimeFromDateTime = (dateTimeString: string): string => {
        return dateTimeString.split("T")[1];
    };

    const marginTop = 4;
    const params = useParams();
    const { flightQuery } = useFlight(params.flightId);

    const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date | null>(null);
    const [selectedDepartureTime, setSelectedDepartureTime] = useState<string | null>(null);

    useEffect(() => {
        if (flightQuery?.data?.data?.departureTime) {
            const { departureTime } = flightQuery.data.data
            setSelectedDepartureDate(departureTime);
            console.log(getTimeFromDateTime(departureTime));
            setSelectedDepartureTime(getTimeFromDateTime(departureTime))
        }
    }, [flightQuery?.data?.data]);

    const handleDepartureTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDepartureTime(event.target.value);
    };

    const handleDepartureDateChange = (date: Date | null) => {
        if (date) setSelectedDepartureDate(date);
    };

    if (flightQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (flightQuery.isError) {
        return <div>There was an error fetching the flight data.</div>;
    }

    return (
        <div>
            <div>
                <FormControl mt={marginTop}>
                    <FormLabel>Pick a departure date</FormLabel>
                    <DatePicker selected={selectedDepartureDate} onChange={handleDepartureDateChange} />
                </FormControl>
                <FormControl mt={marginTop}>
                    <FormLabel>Pick a departure time</FormLabel>
                    <input
                        aria-label="Time"
                        value={selectedDepartureTime || ""}
                        type="time"
                        onChange={handleDepartureTimeChange}
                    />
                </FormControl>
            </div>
        </div>
    );
};

export default ManageFlight;
