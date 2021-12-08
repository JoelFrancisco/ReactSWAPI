import { useEffect, useState, FC } from 'react';
import { Planet } from "../entities/Planet";
import { Film } from "../entities/Film";
import { Character } from "../entities/Character";

import { FiHome } from 'react-icons/fi';

type Props = {
  planet: Planet;
  setShowPlanetInformation: (value: boolean) => void;
  setFilm: (value: Film) => void;
  setShowFilmInformation: (value: boolean) => void;
  setCharacter: (value: Character) => void;
  setShowCharacterInformation: (value: boolean) => void;
  setWhichResultsToShow: (value: string) => void;
  films: Film[];
  characters: Character[];
}

const PlanetInformation: FC<Props> = ({ 
  planet, 
  setShowPlanetInformation, 
  setFilm, 
  setShowFilmInformation, 
  setCharacter, 
  setShowCharacterInformation, 
  setWhichResultsToShow,
  films: filmsProp,
  characters
}) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [residents, setResidents] = useState<Character[]>([]);
  
  const getFilmsInfo = () => {
    const films: Film[] = planet.films.map((filmUrl: string) => {
      const filmIndex = filmUrl.split('/')[5];
      const film = filmsProp[Number(filmIndex) - 1];
      return film;
    });
    
    setFilms(films);
  }

  const getResidentsInfo = () => {
    const residents: Character[] = planet.residents.map((residentUrl: string) => {
      const residentIndex = Number(residentUrl.split('/')[5]);
      const resident = characters[residentIndex < 17 ? residentIndex - 1 : residentIndex - 2];
      return resident;
    });
    
    setResidents(residents);
  }
  
  useEffect(() => {
    getFilmsInfo();
  }, [])

  useEffect(() => {
    getResidentsInfo();
  }, [])

  return (
    <>
      <div className="flex justify-around min-w-full flex-col">
        <div className="md:flex md:w-full md:flex-col">
          <div className="md:w-full md:flex">
            <h3 className="flex font-semibold md:text-lg md:w-1/3 md:justify-center md:mr-6">
              Nome: <div className="ml-2 font-normal">{planet.name}</div> 
            </h3>

            <h3 className="flex font-semibold md:text-lg md:w-1/3 md:justify-center">
              Período de rotação: <div className="ml-2 font-normal">{planet.rotation_period}</div> 
            </h3>

            <h3 className="flex font-semibold md:text-lg md:w-1/3 md:justify-center">
              Período de órbita: <div className="ml-2 font-normal">{planet.orbital_period}</div> 
            </h3>
          </div>
          
          <div className="md:w-full md:flex">
            <h3 className="flex font-semibold md:text-lg md:w-1/3 md:justify-center">
              Diâmetro: <div className="ml-2 font-normal">{planet.diameter}</div> 
            </h3>

            <h3 className="flex font-semibold md:text-lg md:w-1/3 md:justify-center">
              Clima: <div className="ml-2 font-normal">{planet.climate}</div> 
            </h3>

            <h3 className="flex font-semibold md:text-lg md:w-1/3 md:justify-center">
              População: <div className="ml-2 font-normal">{planet.population}</div> 
            </h3>
          </div>
        </div>
        
        <div className="md:flex md:min-w-full md:justify-around mt-4">
          <h3 className="flex flex-col items-center font-semibold bg-gray-900 border-gray-50 
            border-4 border-double rounded-lg p-2 text-gray-50 max-w-md md:w-1/2 mt-5"
          >
            Filmes <div className="ml-2 font-normal w-full flex flex-col justify-center items-center">{
              films.length > 0 ? films.map(film => (
                film && (
                  <div 
                    key={film.title}
                    className="hover:bg-gray-700 hover:text-white rounded-full cursor-pointer 
                      min-w-full flex justify-center"
                    onClick={() => {
                      setFilm(film);
                      setWhichResultsToShow('films');
                      setShowFilmInformation(true);
                      setShowPlanetInformation(false); 
                    }}>
                      {film.title}
                  </div>
                )
              ))
              :
              <div>Nenhum filme encontrado</div>
            }</div> 
          </h3>

          <h3 className="flex flex-col items-center font-semibold bg-gray-900 border-gray-50 border-double border-4 
            rounded-lg p-2 text-gray-50 max-w-md md:w-1/2 mt-5"
          >
            Residentes <div className="ml-2 font-normal w-full flex flex-col justify-center items-center">{
              residents.length > 0 ? residents.map(resident => (
                resident && (
                  <div 
                    key={resident.name}
                    className="hover:bg-gray-700 hover:text-white rounded-full cursor-pointer w-full flex justify-center"
                    onClick={() => {
                      setCharacter(resident);
                      setWhichResultsToShow('characters');
                      setShowCharacterInformation(true);
                      setShowPlanetInformation(false);
                  }}>
                    {resident.name}
                  </div>
                )
              ))
              :
              <div>Não há residentes</div>
            }</div> 
          </h3>
        </div>
      </div>

      <button 
        className="font-bold mt-5 hover:bg-white hover:text-gray-800 p-2 rounded-lg transition duration-500 ease-in-out" 
        onClick={() => setShowPlanetInformation(false)}
      >
        <FiHome className="w-6 h-6" />
      </button>
    </>
  )
}

export default PlanetInformation;
