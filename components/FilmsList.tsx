import { FC } from 'react';

import { Film } from '../entities/Film';
import { getFormattedDate } from '../utils/getFormattedDate';

type Props = {
  filmsToDisplay: Film[];
  setFilm: (value: Film) => void;
  setShowFilmInformation: (value: boolean) => void;
  showFilmInformation: boolean;
};

const FilmsList: FC<Props> = ({
  filmsToDisplay,
  setFilm,
  setShowFilmInformation,
  showFilmInformation,
}) => {
  return (
    <div className="flex flex-col w-full justify-between opacity-100">
      {filmsToDisplay &&
        filmsToDisplay.map((film: Film) => (
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
            bg-gray-800 text-gray-50 md:flex-row md:justify-evenly md:items-center hover:bg-gray-900 
            hover:text-white transition-all duration-75 ease-in-out cursor-pointer md:text-lg"
            >
              <div className="flex justify-center md:w-1/2 md:justify-start md:ml-72">
                <div className="font-bold">Título:</div>
                <div className="ml-2">{film.title}</div>
              </div>
              <div className="flex justify-center md:w-1/2 md:justify-start">
                <div className="font-bold">Data de lançamento:</div>
                <div className="ml-2">{getFormattedDate(film.release_date)}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FilmsList;
