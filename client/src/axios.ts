import Axios from "axios";
import { fetchNewTokens, getAccessToken } from "./utils/token";

const axios = Axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axios.interceptors.request.use(
  async function (config) {
    if (config.url?.endsWith("logout")) return config;

    await fetchNewTokens();
    const token = getAccessToken();
    config.headers.authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axios;
