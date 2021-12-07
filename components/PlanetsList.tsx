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
      {
        planetsToDisplay && planetsToDisplay.map((result: Planet) => (
        <div 
          key={result.name} 
          className="hover:bg-gray-800 min-w-full flex-col justify-around items-center rounded-xl" 
          onClick={() => {
            setPlanet(result);
            setShowPlanetInformation(!showPlanetInformation);
          }}
        >
          <div 
            className="font-medium flex justify-around min-w-full 
              flex-col border-2 border-gray-800 p-2 rounded-xl 
              bg-gray-200 text-gray-800"
          >
            <div className="flex justify-center">
              <div className="font-bold">Nome:</div>
              <div className="ml-2">{result.name}</div>
            </div>
            <div className="flex justify-center">
              <div className="font-bold">População:</div>
              <div className="ml-2">{result.population}</div>
            </div>
            <div className="flex justify-center">
              <div className="font-bold">Clima:</div>
              <div className="ml-2">{result.climate}</div>
            </div>
          </div> 
        </div>
        ))
      }
    </div>
  );
};

export default PlanetsList;