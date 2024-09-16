import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { toast } from "react-toastify";

const axiosHttp = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const requestHandler = (request: InternalAxiosRequestConfig) => {
  // Optionally, you can add auth tokens or other configurations here
  // request.headers['Authorization'] = `Bearer ${token}`;
  return request;
};
const requestErrorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};
const responsetHandler = (response: AxiosResponse) => {
  return response;
};
const responseErrorHandler = (error: AxiosError) => {
  if (error.response) {
    switch (error.response?.status) {
      case 400:
        toast.error(
          `Bad Request: The request could not be understood or was missing required parameters.`
        );
        console.error(
          "Bad Request: The request could not be understood or was missing required parameters."
        );
        break;
      case 401:
        toast.error(
          `Unauthorized: Authentication failed or user does not have permissions for the requested operation.`
        );
        console.error(
          "Unauthorized: Authentication failed or user does not have permissions for the requested operation."
        );
        break;
      case 403:
        toast.error(
          `Forbidden: Authentication succeeded but the authenticated user does not have access to the requested resource.`
        );
        // Handle not found error
        console.error(
          "Forbidden: Authentication succeeded but the authenticated user does not have access to the requested resource."
        );
        break;
      case 404:
        toast.error(`Not Found: The requested resource could not be found.`);
        // Handle not found error
        console.error("Not Found: The requested resource could not be found.");
        break;
      case 500:
        toast.error(`Internal Server Error: An error occurred on the server.`);
        // Handle server error
        console.error(
          "Internal Server Error: An error occurred on the server."
        );
        break;
      case 502:
        // Handle server error
        console.error(
          "Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server."
        );
        break;
      case 503:
        toast.error(
          `Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance.`
        );
        // Handle server error
        console.error(
          "Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance."
        );
        break;
      case 504:
        toast.error(
          `Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.`
        );
        console.error(
          "Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server."
        );
        break;
      default:
        toast.error(`An unexpected error occurred: ${error.response?.status}`);
        console.error("An unexpected error occurred:", error.response?.status);
        break;
    }
  } else if (error.request) {
    toast.error(
      "🦄 Network Error: The request was made but no response was received."
    );
    // The request was made but no response was received
    console.error(
      "Network Error: The request was made but no response was received."
    );
  } else {
    toast.error(`Error: ${error.message} `);
    // Something happened in setting up the request that triggered an Error
    console.error("Error:", error.message);
  }

  return Promise.reject(error);
};

axiosHttp.interceptors.request.use(requestHandler, requestErrorHandler);
axiosHttp.interceptors.response.use(responsetHandler, responseErrorHandler);

export default axiosHttp;
