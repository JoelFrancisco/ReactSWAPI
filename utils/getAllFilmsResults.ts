import { Film } from '../entities/Film';
import { api, apiPages } from './api';

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

const getAllFilmsResults = async () => {
  let res;

  try {
    res = await api.get('/films');
  } catch (err: any) {
    return {
      error: true,
      films: [],
      message: err.message,
    };
  }

  let data: Data = res.data;
  const filmsResults: Film[] = [...data.results];

  while (data.next) {
    try {
      res = await apiPages.get(data.next);
    } catch (err: any) {
      return {
        error: true,
        characters: [],
        message: err.message,
      };
    }
    data = res.data;

    filmsResults.push(...data.results);
  }

  return {
    films: filmsResults,
    error: false,
    message: 'Films found successfully',
  };
};

export { getAllFilmsResults };
