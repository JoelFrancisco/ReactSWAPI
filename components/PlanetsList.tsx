import { FC } from 'react';

import { Planet } from '../entities/Planet';

type Props = {
  planetsToDisplay: Planet[];
  setPlanet: (value: Planet) => void;
  setShowPlanetInformation: (value: boolean) => void;
  showPlanetInformation: boolean;
}

const PlanetsList: FC<Props> = ({ 
  planetsToDisplay, 
  setPlanet, 
  setShowPlanetInformation, 
  showPlanetInformation 
}) => {
  return (
    <div className="flex flex-col w-full justify-between">
      <div className="flex w-full justify-around font-bold text-xl border-2 border-white border-solid mb-4">
        <h1>Nome</h1>
        <h1>População</h1>
        <h1>Clima</h1>
      </div>
      {
        planetsToDisplay && planetsToDisplay.map((result: Planet) => (
        <div 
          key={result.name} 
          className="hover:bg-gray-800 min-w-full flex justify-center items-center rounded-xl" 
          onClick={() => {
            setPlanet(result);
            setShowPlanetInformation(!showPlanetInformation);
          }}
        >
          <div 
            className="font-medium flex justify-around min-w-full"
          >
            <div className="w-20">{result.name}</div>
            <div className="w-20">{result.population}</div>
            <div className="w-20">{result.climate}</div>
          </div> 
        </div>
        ))
      }
    </div>
  );
};

export default PlanetsList;