import axios, { AxiosRequestConfig } from "axios";
import BASE_URL from "../util/baseUrl";


export interface Response<T> {
  data: T[];
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

  get = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<Response<T>>(this.endpoint, config)
      .then((response) => response.data);
}

export default ApiClient;