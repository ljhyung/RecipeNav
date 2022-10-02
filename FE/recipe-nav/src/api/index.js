import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://j7d105.p.ssafy.io/api",
});

axiosClient.withCredentials = true;

export const proxyImageURL = "https://j7d105.p.ssafy.io/api/proxy/img?img-url=";

export default axiosClient;
