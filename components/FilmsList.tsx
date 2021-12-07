import { FC } from 'react';

import { Film } from '../entities/Film';

type Props = {
  filmsToDisplay: Film[];
  setFilm: (value: Film) => void;
  setShowFilmInformation: (value: boolean) => void;
  showFilmInformation: boolean;
}

const FilmsList: FC<Props> = ({ 
  filmsToDisplay, 
  setFilm, 
  setShowFilmInformation, 
  showFilmInformation
}) => {
  return (
    <div className="flex flex-col w-full justify-between">
      {
        filmsToDisplay && filmsToDisplay.map((film: Film) => (
        <div 
          key={film.title} 
          className="hover:bg-gray-800 min-w-full flex justify-center items-center rounded-xl" 
          onClick={() => {
            setFilm(film);
            setShowFilmInformation(!showFilmInformation);
          }}
        >
          <div 
            className="font-medium flex justify-around min-w-full 
            flex-col border-2 border-gray-800 p-2 rounded-xl 
            bg-gray-200 text-gray-800"
          >
            <div className="flex justify-center">
              <div className="font-bold">Título:</div>  
              <div className="ml-2">{film.title}</div>
            </div>
            <div className="flex justify-center">
              <div className="font-bold">Clima:</div>
              <div className="ml-2">{film.release_date}</div>
            </div>
          </div> 
        </div>
        ))
      }
    </div>
  );
};

export default FilmsList;