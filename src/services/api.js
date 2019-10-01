import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dev.wpopal.com/latehome_free/wp-json/estate-api',
});

export default api;
