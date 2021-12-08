import { useEffect, useState, FC } from 'react';
import { Planet } from '../entities/Planet';
import { Film } from '../entities/Film';
import { Character } from '../entities/Character';

type Props = {
  planets: Planet[];
  setPlanetsToDisplay: (planets: Planet[]) => void;
  films: Film[];
  setFilmsToDisplay: (films: Film[]) => void;
  characters: Character[];
  setCharactersToDisplay: (characters: Character[]) => void;
  whichResultsToShow: string;
}

const Searchbox: FC<Props> = ({ 
  planets, 
  setPlanetsToDisplay, 
  films, 
  setFilmsToDisplay, 
  characters, 
  setCharactersToDisplay,
  whichResultsToShow 
}) => {
  const [text, setText] = useState('');
  
  useEffect(() => {
    switch(whichResultsToShow) {
      case 'planets':
        const newPlanetsToDisplay = planets.filter(planet => { 
          return planet.name.toLowerCase().includes(text.toLowerCase()) 
            || planet.population.toString().includes(text) 
            || planet.climate.toLowerCase().includes(text.toLowerCase());
        });
        setPlanetsToDisplay([ ...newPlanetsToDisplay ]);
      case 'characters':
        const newCharactersToDisplay = characters.filter(character => { 
          return character.name.toLowerCase().includes(text.toLowerCase()) 
            || character.gender.toLowerCase().startsWith(text.toLowerCase());
        });
        setCharactersToDisplay([ ...newCharactersToDisplay ]);
      case 'films':
        const newFilmsToDisplay = films.filter(film => { 
          return film.title.toLowerCase().includes(text.toLowerCase()) 
            || film.release_date.toLowerCase().includes(text.toLowerCase());
        });
        setFilmsToDisplay([ ...newFilmsToDisplay ]);
    }
  }, [text]);
  
  return (
    <input 
      type="text" 
      placeholder="Pesquisar" 
      onChange={event => setText(event.target.value)} 
      className="outline-none w-3/4 p-2 rounded-full 
        mt-10 mb-10 bg-black opacity-70 text-white md:w-1/2"
    />
  )
}

export default Searchbox;
