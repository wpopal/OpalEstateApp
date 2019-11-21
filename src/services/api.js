import axios from 'axios';
import {Base_url} from "../config/setting";

const api = axios.create({
  baseURL: Base_url + '/wp-json/estate-api/v1/',
});

export default api;
