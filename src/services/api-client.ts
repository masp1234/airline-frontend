import axios, { AxiosRequestConfig } from "axios";

export interface FlightResponse<T> {
  flights: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5224/api/mysql/",
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAllFlightsBySearchData = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<FlightResponse<T>>(this.endpoint, config)
      .then((response) => response.data);
}

export default ApiClient;