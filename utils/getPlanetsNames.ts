import { getAllPlanetsResults } from './getAllPlanetsResults';

const getPlanetsNames = async () => {
  const results = await getAllPlanetsResults();
  const names = results.map((product) => product.name);
  return names;
};

export { getPlanetsNames };
