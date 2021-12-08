import { Planet } from '../entities/Planet';
import { api, apiPages } from './api';

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

const getAllPlanetsResults = async () => {
  let res;
  try {
    res = await api.get('/planets');
  } catch (err: any) {
    return {
      error: true,
      message: err.message,
      planets: [],
    };
  }

  let data: Data = res.data;
  const planetsResults: Planet[] = [...data.results];

  while (data.next) {
    try {
      res = await apiPages.get(data.next);
    } catch (err: any) {
      return {
        error: true,
        message: err.message,
        planets: [],
      };
    }
    data = res.data;

    planetsResults.push(...data.results);
  }

  return {
    planets: planetsResults,
    error: false,
    message: 'Planets found successfully',
  };
};

export { getAllPlanetsResults };
