import { useEffect, useState, FC } from 'react';
import { Planet } from "../entities/Planet";
import { Film } from "../entities/Film";
import { Character } from "../entities/Character";

type Props = {
  planet: Planet;
  setShowPlanetInformation: (value: boolean) => void;
  setFilm: (value: Film) => void;
  setShowFilmInformation: (value: boolean) => void;
  setCharacter: (value: Character) => void;
  setShowCharacterInformation: (value: boolean) => void;
  setWhichResultsToShow: (value: string) => void;
}

const PlanetInformation: FC<Props> = ({ 
  planet, 
  setShowPlanetInformation, 
  setFilm, 
  setShowFilmInformation, 
  setCharacter, 
  setShowCharacterInformation, 
  setWhichResultsToShow 
}) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [residents, setResidents] = useState<Character[]>([]);
  
  const getFilmsInfo = async () => {
    const films = await Promise.all(planet.films.map(async (film: string) => {
      const filmInfo = await fetch(film).then((res) => res.json());
      return filmInfo;
    }));
    
    setFilms(films);
  }

  const getResidentsInfo = async () => {
    const residents = await Promise.all(planet.residents.map(async (resident: string) => {
      const residentInfo = await fetch(resident).then((res) => res.json());
      return residentInfo;
    }));
    
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
      <div className="flex justify-around min-w-full">
        <div>
          <h3 className="flex font-semibold">
            Nome: <div className="ml-2 font-normal">{planet.name}</div> 
          </h3>

          <h3 className="flex font-semibold">
            Período de rotação: <div className="ml-2 font-normal">{planet.rotation_period}</div> 
          </h3>

          <h3 className="flex font-semibold">
            Período de órbita: <div className="ml-2 font-normal">{planet.orbital_period}</div> 
          </h3>

          <h3 className="flex font-semibold">
            Diâmetro: <div className="ml-2 font-normal">{planet.diameter}</div> 
          </h3>

          <h3 className="flex font-semibold">
            Clima: <div className="ml-2 font-normal">{planet.climate}</div> 
          </h3>

          <h3 className="flex font-semibold">
            População: <div className="ml-2 font-normal">{planet.population}</div> 
          </h3>
        </div>

        <h3 className="flex flex-col items-center font-semibold bg-gray-200 border-gray-800 border-2 rounded-lg p-2 text-gray-800">
          Filmes <div className="ml-2 font-normal">{
            films.length > 0 ? films.map(film => (
              <div 
                key={film.title}
                className="hover:bg-gray-800 hover:text-white rounded-full cursor-pointer min-w-full"
                onClick={() => {
                  setFilm(film);
                  setWhichResultsToShow('films');
                  setShowFilmInformation(true);
                  setShowPlanetInformation(false); 
              }}>{film.title}</div>
            ))
            :
            <div>Nenhum filme encontrado</div>
          }</div> 
        </h3>

        <h3 className="flex flex-col items-center font-semibold bg-gray-200 border-gray-800 border-2 rounded-lg p-2 text-gray-800">
          Residentes <div className="ml-2 font-normal">{
            residents.length > 0 ? residents.map(resident => (
              <div 
                key={resident.name}
                className="hover:bg-gray-800 hover:text-white rounded-full cursor-pointer min-w-full"
                onClick={() => {
                  setCharacter(resident);
                  setWhichResultsToShow('characters');
                  setShowCharacterInformation(true);
                  setShowPlanetInformation(false);
              }}>{resident.name}</div>
            ))
            :
            <div>Não há residentes</div>
          }</div> 
        </h3>
      </div>

      <button 
        className="font-bold mt-5 hover:bg-gray-800 p-2 rounded-lg transition duration-500 ease-in-out" 
        onClick={() => setShowPlanetInformation(false)}
      >
        Voltar
      </button>
    </>
  )
}

export default PlanetInformation;
