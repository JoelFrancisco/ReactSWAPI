import { Film } from '../entities/Film';

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

const baseUrl = 'https://swapi.dev/api';
const headers = new Headers({ 'User-Agent': '*' });
const init = { method: 'GET', headers };

const getAllFilmsResults = async () => {
  let res = await fetch(`${baseUrl}/films`, init);
  let data: Data = await res.json();
  const filmsResults: Film[] = [...data.results];

  while (data.next) {
    res = await fetch(data.next, init);
    data = await res.json();

    filmsResults.push(...data.results);
  }

  return filmsResults;
};

export { getAllFilmsResults };
