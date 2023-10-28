import axios from 'axios';

const baseAxios = axios.create({

  baseURL: "http://138.68.184.31:3000",
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default baseAxios;