import { Character } from '../entities/Character';

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

const baseUrl = 'https://swapi.dev/api';

const getAllCharactersResults = async () => {
  let res = await fetch(`${baseUrl}/people`);
  let data: Data = await res.json();
  const charactersResults: Character[] = [...data.results];

  while (data.next) {
    res = await fetch(data.next);
    data = await res.json();

    charactersResults.push(...data.results);
  }

  return charactersResults;
};

export { getAllCharactersResults };
