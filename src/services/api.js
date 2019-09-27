import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dev.wpopal.com',
});

export default api;
