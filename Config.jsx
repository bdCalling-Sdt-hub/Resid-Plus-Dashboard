import axios from 'axios';

const baseAxios = axios.create({

  baseURL: "http://159.65.18.179:3000",
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default baseAxios;