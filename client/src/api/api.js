import axios from "axios";
import { isAuthenticated } from "../routes/permissionChecker";

const api = axios.create({
  baseURL: "http://localhost:5000/spaapi/",
});

api.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      config.headers["Authorization"] = "Bearer " + isAuthenticated();
      config.headers["x-access-token"] = isAuthenticated();
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
