import axios, { AxiosRequestConfig } from "axios";
import BASE_URL from "../util/baseUrl";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
  },
});

class ApiClient<T, R = T> {

  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<R>(this.endpoint, config)

      .then((response) => response.data);
}

export default ApiClient;