import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error responses here
      console.error("Error response:", error.response);
    } else if (error.request) {
      // Handle no response received
      console.error("No response received:", error.request);
    } else {
      // Handle other errors
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
