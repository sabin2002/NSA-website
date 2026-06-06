import axios from "axios";

const API = axios.create({
  baseURL: "https://nsa-website-production.up.railway.app/api",
});

export default API;