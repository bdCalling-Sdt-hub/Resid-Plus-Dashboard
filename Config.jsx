import axios from 'axios';

const baseAxios = axios.create({

  baseURL: "https://resid-plus.com",
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default baseAxios;