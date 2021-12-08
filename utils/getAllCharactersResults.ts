import { Character } from '../entities/Character';
import { api, apiPages } from './api';

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

const getAllCharactersResults = async () => {
  let res;

  try {
    res = await api.get('/people');
  } catch (err: any) {
    return {
      error: true,
      characters: [],
      message: err.message,
    };
  }

  let data: Data = res.data;
  const charactersResults: Character[] = [...data.results];

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

    charactersResults.push(...data.results);
  }

  return {
    characters: charactersResults,
    error: false,
    message: 'Characters found successfully',
  };
};

export { getAllCharactersResults };
