import { Planet } from '../entities/Planet';

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

const baseUrl = 'https://swapi.dev/api';
const headers = new Headers({ 'User-Agent': '*' });
const init = { method: 'GET', headers };

const getAllPlanetsResults = async () => {
  let res = await fetch(`${baseUrl}/planets`, init);
  let data: Data = await res.json();
  const planetsResults: Planet[] = [...data.results];

  while (data.next) {
    res = await fetch(data.next, init);
    data = await res.json();

    planetsResults.push(...data.results);
  }

  return planetsResults;
};

export { getAllPlanetsResults };
