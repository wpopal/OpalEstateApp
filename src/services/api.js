import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2/latehome_free/wp-json/estate-api/v1/',
});

export default api;
