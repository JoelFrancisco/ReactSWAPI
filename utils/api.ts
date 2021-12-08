import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swapi.dev/api',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': '*',
  },
});

const apiPages = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': '*',
  },
});

export { api, apiPages };
