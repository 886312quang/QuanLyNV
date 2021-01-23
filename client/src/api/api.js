import axios from "axios";
import { isAuthenticated } from "../routes/permissionChecker";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
});

api.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      config.headers["Authorization"] = "Bearer " + isAuthenticated();
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
