import { Film } from '../entities/Film';

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

const baseUrl = 'https://swapi.dev/api';

const getAllFilmsResults = async () => {
  let res = await fetch(`${baseUrl}/films`);
  let data: Data = await res.json();
  const filmsResults: Film[] = [...data.results];

  while (data.next) {
    res = await fetch(data.next);
    data = await res.json();

    filmsResults.push(...data.results);
  }

  return filmsResults;
};

export { getAllFilmsResults };
