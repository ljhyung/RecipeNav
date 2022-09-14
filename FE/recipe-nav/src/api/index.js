import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
});
axiosClient.withCredentials = true;
export default axiosClient;
