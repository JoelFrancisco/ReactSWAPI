import { FC } from 'react';

import { Character } from '../entities/Character';

type Props = {
  charactersToDisplay: Character[];
  setCharacter: (value: Character) => void;
  setShowCharacterInformation: (value: boolean) => void;
  showCharacterInformation: boolean;
}

const CharactersList: FC<Props> = ({ 
  charactersToDisplay, 
  setCharacter, 
  setShowCharacterInformation, 
  showCharacterInformation
}) => {
  return (
    <div className="flex flex-col w-full justify-between opacity-100">
      {
        charactersToDisplay && charactersToDisplay.map((character: Character) => (
        <div 
          key={character.name} 
          className="hover:bg-gray-800 min-w-full flex justify-center items-center rounded-xl" 
          onClick={() => {
            setCharacter(character);
            setShowCharacterInformation(!showCharacterInformation);
          }}
        >
          <div 
            className="font-medium flex justify-around min-w-full 
            flex-col border-2 border-gray-800 p-2 rounded-xl 
            bg-gray-800 text-gray-50 md:flex-row md:justify-evenly md:items-center hover:bg-gray-900 
            hover:text-white transition-all duration-75 ease-in-out cursor-pointer md:text-lg"
          >
            <div className="flex justify-center md:w-1/2 md:justify-start md:ml-72">
              <div className="font-bold">Nome:</div>
              <div className="ml-2">{character.name}</div>
            </div>
            <div className="flex justify-center md:w-1/2 md:justify-start">
              <div className="font-bold">Gênero:</div>
              <div className="ml-2">{character.gender}</div>
            </div>
          </div> 
        </div>
        ))
      }
    </div>
  );
};

export default CharactersList;