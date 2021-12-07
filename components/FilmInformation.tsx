import { useEffect, useState, FC } from 'react';

import { Film } from '../entities/Film';
import { Planet } from '../entities/Planet';
import { Character } from '../entities/Character';

type Props = {
  film: Film;
  setShowFilmInformation: (value: boolean) => void;
  setPlanet: (value: Planet) => void;
  setShowPlanetInformation: (value: boolean) => void;
  setCharacter: (value: Character) => void;
  setShowCharacterInformation: (value: boolean) => void;
  setWhichResultsToShow: (value: string) => void;
}

const FilmInformation: FC<Props> = ({ 
  film, 
  setShowFilmInformation, 
  setPlanet,
  setShowPlanetInformation,
  setCharacter,
  setShowCharacterInformation,
  setWhichResultsToShow
}) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  
  const getPlanetsInfo = async () => {
    const planets: Planet[] = await Promise.all(film.planets.map(async (planet: string) => {
      const planetInfo = await fetch(planet).then((res) => res.json());
      return planetInfo;
    }));
    
    setPlanets(planets);
  }

  const getCharactersInfo = async () => {
    const characters: Character[] = await Promise.all(film.characters.map(async (character: string) => {
      const characterInfo = await fetch(character).then((res) => res.json());
      return characterInfo;
    }));
    
    setCharacters(characters);
  }
  
  useEffect(() => {
    getPlanetsInfo();
  }, [])

  useEffect(() => {
    getCharactersInfo();
  }, [])

  return (
    <>
      <div className="flex justify-around min-w-full flex-col">
        <div>
          <h3 className="flex font-semibold">
            Título: <div className="ml-2 font-normal">{film.title}</div> 
          </h3>

          <h3 className="flex font-semibold">
            Episódio: <div className="ml-2 font-normal">{film.episode_id}</div> 
          </h3>

          <h3 className="flex font-semibold">
            Ano de lançamento: <div className="ml-2 font-normal">{film.release_date}</div> 
          </h3>

          <h3 className="flex font-semibold">
            Texto de abertura: <div className="ml-2 font-normal">{film.opening_crawl}</div> 
          </h3>
        </div>

        <div className="flex flex-row w-full justify-around mt-5">
          <h3 className="flex flex-col items-center font-semibold bg-gray-200 border-gray-800 border-2 rounded-lg p-2 text-gray-800 min-w-1/4">
            Personagens <div className="ml-2 font-normal">{
              characters.length > 0 ? characters.map(character => (
                <div 
                  className="hover:bg-gray-800 hover:text-white rounded-full cursor-pointer min-w-full"
                  onClick={() => {
                    setCharacter(character);
                    setWhichResultsToShow('characters');
                    setShowCharacterInformation(true);
                    setShowFilmInformation(false); 
                }}>{character.name}</div>
              ))
              :
              <div>Nenhum personagem encontrado</div>
            }</div> 
          </h3>

          <h3 className="flex flex-col items-center font-semibold bg-gray-200 border-gray-800 border-2 rounded-lg p-2 text-gray-800 min-w-1/4">
            Planetas <div className="ml-2 font-normal">{
              planets.length > 0 ? planets.map(planet => (
                <div 
                  className="hover:bg-gray-800 hover:text-white rounded-full cursor-pointer min-w-full"
                  onClick={() => {
                    setPlanet(planet);
                    setWhichResultsToShow('planets');
                    setShowPlanetInformation(true);
                    setShowFilmInformation(false); 
                }}>{planet.name}</div>
              ))
              :
              <div>Não há planetas</div>
            }</div> 
          </h3>
        </div>
      </div>

      <button 
        className="font-bold mt-5 hover:bg-gray-800 p-2 rounded-lg transition duration-500 ease-in-out" 
        onClick={() => setShowFilmInformation(false)}
      >
        Voltar
      </button>
    </>
  )
}

export default FilmInformation;
