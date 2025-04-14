import axios from "axios";

// const baseURL = "https://be-da-web-nam4.onrender.com/api";
const baseURL = "http://127.0.0.1:8000/api";
const timeout = 20000;

const axiosInstance = axios.create({
  baseURL,
  timeout,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data;
    }
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
