import axios from "axios";
import { omit } from "lodash";
import { getItem } from "../utils";
import { refreshToken } from "./apiCall";

const customAxios = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    if (config?.params?.isAuthRequired) {
      config.headers.authorization = `Bearer ${getItem("authtoken")}`;
    }

    config.params = omit(config.params, "isAuthRequired");

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (err.response.data.name === "TokenExpiredError") {
      refreshToken();
    }

    return Promise.reject(err);
  }
);

export { customAxios };
