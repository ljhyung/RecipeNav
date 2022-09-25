import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://j7d105.p.ssafy.io/api",
});
axiosClient.withCredentials = true;
export default axiosClient;
