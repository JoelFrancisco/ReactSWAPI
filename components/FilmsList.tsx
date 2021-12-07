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
      <div className="flex w-full justify-around font-bold text-xl border-2 border-white border-solid mb-4">
        <h1>Título</h1>
        <h1>Ano de lançamento</h1>
      </div>
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
            className="font-medium flex justify-around min-w-full"
          >
            <div className="w-52">{film.title}</div>
            <div className="w-52">{film.release_date}</div>
          </div> 
        </div>
        ))
      }
    </div>
  );
};

export default FilmsList;