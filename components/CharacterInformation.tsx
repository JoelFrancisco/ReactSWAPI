import type { NextComponentType } from 'next';
import { useEffect, useState, FC } from 'react';

import { Character } from '../entities/Character';
import { Film } from '../entities/Film';

type Props = {
  character: Character;
  setShowCharacterInformation: (value: boolean) => void;
  setFilm: (value: Film) => void;
  setShowFilmInformation: (value: boolean) => void;
  setWhichResultsToShow: (value: string) => void;
}

const CharacterInformation: FC<Props> = ({ 
  character, 
  setShowCharacterInformation,
  setFilm, 
  setShowFilmInformation,
  setWhichResultsToShow
}) => {
  const [films, setFilms] = useState<Film[]>([]);
  
  const getFilmsInfo = async () => {
    const films: Film[] = await Promise.all(character.films.map(async (film: string) => {
      const filmInfo = await fetch(film).then((res) => res.json());
      return filmInfo;
    }));
    
    setFilms(films);
  }
  
  useEffect(() => {
    getFilmsInfo();
  }, [])

  return (
    <>
      <div className="flex justify-around min-w-full flex-col">
        <div className="md:w-full md:flex md:justify-around">
          <h3 className="flex font-semibold">
            Nome: <div className="ml-2 font-normal">{character.name}</div> 
          </h3>

          <h3 className="flex font-semibold">
            Ano de aniversário: <div className="ml-2 font-normal">{character.birth_year}</div> 
          </h3>

          <h3 className="flex font-semibold md:ml-10">
            Gênero: <div className="ml-2 font-normal">{character.gender}</div> 
          </h3>
        </div>

        <div className="w-full md:flex md:justify-center">
          <h3 className="flex flex-col items-center font-semibold bg-gray-900 border-gray-50 border-double border-4 
              rounded-lg p-2 text-gray-50 max-w-md md:w-1/2 mt-5">
            Filmes <div className="ml-2 font-normal w-full flex flex-col justify-center items-center">{
              films.length > 0 ? films.map(film => (
                <div 
                  key={film.title}
                  className="hover:bg-gray-700 hover:text-white rounded-full cursor-pointer w-full flex justify-center"
                  onClick={() => {
                    setFilm(film);
                    setWhichResultsToShow('films');
                    setShowFilmInformation(true);
                    setShowCharacterInformation(false); 
                }}>{film.title}</div>
              ))
              :
              <div>Nenhum filme encontrado</div>
            }</div> 
          </h3>
        </div>
      </div>

      <button 
        className="font-bold mt-5 hover:bg-white hover:text-gray-800 p-2 rounded-lg transition duration-500 ease-in-out" 
        onClick={() => setShowCharacterInformation(false)}
      >
        Voltar
      </button>
    </>
  )
}

export default CharacterInformation;
