import type { NextPage, GetServerSideProps } from 'next'
import { useState } from 'react';

import { Planet } from '../entities/Planet';
import { Character } from '../entities/Character';
import { Film } from '../entities/Film';

import { getAllPlanetsResults } from '../utils/getAllPlanetsResults';
import { getAllFilmsResults } from '../utils/getAllFilmsResults';
import { getAllCharactersResults } from '../utils/getAllCharactersResults';

import FilmInformation from '../components/FilmInformation';
import PlanetInformation from '../components/PlanetInformation';
import CharacterInformation from '../components/CharacterInformation';

import PlanetsList from '../components/PlanetsList';
import FilmsList from '../components/FilmsList';
import CharactersList from '../components/CharactersList';

import Searchbox from '../components/Searchbox';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const planets = await getAllPlanetsResults();
    const films = await getAllFilmsResults();
    const characters = await getAllCharactersResults();

    return {
      props: {
        planets,
        films,
        characters
      }
    }
  } catch(err) {
    return {
      props: {
        
      }
    }
  }
}

type Props = {
  planets: Planet[];
  films: Film[];
  characters: Character[];
}

const Home: NextPage<Props> = ({ planets, films, characters }) => {
  const [showPlanetInformation, setShowPlanetInformation] = useState<boolean>(false);
  const [planet, setPlanet] = useState<Planet>();
  
  const [planetsToDisplay, setPlanetsToDisplay] = useState(planets);
  
  const [whichResultsToShow, setWhichResultsToShow] = useState<string>('planets');

  const [showFilmInformation, setShowFilmInformation] = useState<boolean>(false);
  const [film, setFilm] = useState<Film>();

  const [showCharacterInformation, setShowCharacterInformation] = useState<boolean>(false);
  const [character, setCharacter] = useState<Character>();

  const [filmsToDisplay, setFilmsToDisplay] = useState(films);
  const [charactersToDisplay, setCharactersToDisplay] = useState(characters);

  return (
    <div className="h-screen min-w-full flex justify-around items-center flex-col">
      <Searchbox 
        planets={planets} 
        setPlanetsToDisplay={setPlanetsToDisplay} 
        films={films}
        setFilmsToDisplay={setFilmsToDisplay}
        characters={characters}
        setCharactersToDisplay={setCharactersToDisplay}
        whichResultsToShow={whichResultsToShow}
      />
      
      {
        !showPlanetInformation &&
        <select 
          value={whichResultsToShow} 
          onChange={event => setWhichResultsToShow(event.target.value)}
          className="bg-white outline-none border-gray-200 border-b-2 border-solid mt-5"
        >
          <option value="planets">Planetas</option>
          <option value="films">Filmes</option>
          <option value="characters">Personagens</option>
        </select>
      }

      <div 
        className="container bg-gray-600 rounded-xl text-white p-10 flex justify-start items-center 
          flex-col mt-20 mb-20 overflow-y-scroll h-3/4"
      >
          { 
            whichResultsToShow === 'planets' ?
              showPlanetInformation && planet ?
                <PlanetInformation 
                  planet={planet} 
                  setShowPlanetInformation={setShowPlanetInformation} 

                  setFilm={setFilm} 
                  setShowFilmInformation={setShowFilmInformation} 

                  setCharacter={setCharacter} 
                  setShowCharacterInformation={setShowCharacterInformation}
                  
                  setWhichResultsToShow={setWhichResultsToShow}
                />
              : 
              <PlanetsList 
                setPlanet={setPlanet} 
                setShowPlanetInformation={setShowPlanetInformation} 
                showPlanetInformation={showPlanetInformation}
                planetsToDisplay={planetsToDisplay}
              />
            : null
          }

          { 
            whichResultsToShow === 'films' ?
              showFilmInformation && film ?
                <FilmInformation 
                  film={film} 
                  setShowFilmInformation={setShowFilmInformation} 

                  setPlanet={setPlanet} 
                  setShowPlanetInformation={setShowPlanetInformation} 

                  setCharacter={setCharacter} 
                  setShowCharacterInformation={setShowCharacterInformation}

                  setWhichResultsToShow={setWhichResultsToShow}
                />
              : 
              <FilmsList 
                setFilm={setFilm}  
                setShowFilmInformation={setShowFilmInformation} 
                showFilmInformation={showFilmInformation}
                filmsToDisplay={filmsToDisplay}
              />
            : null
          }

          { 
            whichResultsToShow === 'characters' ?
              showCharacterInformation && character ?
                <CharacterInformation 
                  character={character} 
                  setShowCharacterInformation={setShowCharacterInformation} 

                  setFilm={setFilm} 
                  setShowFilmInformation={setShowFilmInformation}

                  setWhichResultsToShow={setWhichResultsToShow}
                />
              : 
              <CharactersList
                setCharacter={setCharacter}   
                setShowCharacterInformation={setShowCharacterInformation} 
                showCharacterInformation={showCharacterInformation}
                charactersToDisplay={charactersToDisplay}
              />
            : null
          }
      </div>
    </div>
  )
}

export default Home;
