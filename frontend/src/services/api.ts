import axios from "axios";

const api = axios.create({
  baseURL: "https://shortly.cloud/",
});

export default api;
