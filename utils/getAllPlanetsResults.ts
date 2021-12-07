import { Planet } from '../entities/Planet';

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

const baseUrl = 'https://swapi.dev/api';

const getAllPlanetsResults = async () => {
  let res = await fetch(`${baseUrl}/planets`);
  let data: Data = await res.json();
  const planetsResults: Planet[] = [...data.results];

  while (data.next) {
    res = await fetch(data.next);
    data = await res.json();

    planetsResults.push(...data.results);
  }

  return planetsResults;
};

export { getAllPlanetsResults };
