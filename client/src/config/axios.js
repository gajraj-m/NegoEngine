import axios from "axios";
import { CONST } from "./index";

export const axiosInstance = axios.create({
  baseURL: CONST.env.API_SERVER,
});
