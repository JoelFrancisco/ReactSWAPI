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
    <div className="flex flex-col w-full justify-between">
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
            bg-gray-200 text-gray-800"
          >
            <div className="flex justify-center">
              <div className="font-bold">Nome:</div>
              <div className="ml-2">{character.name}</div>
            </div>
            <div className="flex justify-center">
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