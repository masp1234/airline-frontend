import axios, { AxiosRequestConfig } from "axios";
import BASE_URL from "../util/baseUrl";


export interface FlightResponse<T> {
  flights: T[];
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
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