import type { NextPage, GetStaticProps } from 'next'
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

export const getStaticProps: GetStaticProps = async () => {
    const { planets, error: errorPlanets, message: messagePlanets } = await getAllPlanetsResults();
    const { films, error: errorFilms, message: messageFilms } = await getAllFilmsResults();
    const { characters, error: errorCharacters, message: messageCharacters } = await getAllCharactersResults();
  
    if (errorPlanets || errorFilms || errorCharacters) {
      return {
        props: {
          error: true,
          planets: [],
          films: [],
          characters: [],
        }
      }
    }

    return {
      props: {
        error: false,
        planets,
        films,
        characters
      },
      revalidate: 30,
    }
}

type Props = {
  error: boolean,
  planets: Planet[];
  films: Film[];
  characters: Character[];
}

const Home: NextPage<Props> = ({ error, planets, films, characters }) => {
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
  <>
    { !error ? 
    <div className="bg-star-wars bg-cover bg-no-repeat h-screen w-full flex justify-around items-center flex-col">

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
        !showPlanetInformation && !showCharacterInformation && !showFilmInformation &&
        <select 
          value={whichResultsToShow} 
          onChange={event => setWhichResultsToShow(event.target.value)}
          className="bg-black outline-none mt-5 text-gray-200 font-medium w-3/4 md:w-1/2 rounded-full opacity-70 p-2"
        >
          <option value="planets">Planetas</option>
          <option value="films">Filmes</option>
          <option value="characters">Personagens</option>
        </select>
      }

      <div 
        className="container bg-gray-800 rounded-xl text-white p-10 flex justify-start items-center 
          flex-col mt-20 mb-20 overflow-y-scroll h-3/4 opacity-90 w-11/12"
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
                  
                  films={films}
                  characters={characters}
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
                  
                  planets={planets}
                  characters={characters}
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
                  
                  films={films}
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
    : <div className="w-full h-screen flex justify-center items-center">404 Error</div>}
  </>
  )
}

export default Home;
