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
      <div className="flex w-full justify-around font-bold text-xl border-2 border-white border-solid mb-4">
        <h1>Nome</h1>
        <h1>Gênero</h1>
      </div>
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
            className="font-medium flex justify-around min-w-full"
          >
            <div className="w-52">{character.name}</div>
            <div className="w-24">{character.gender}</div>
          </div> 
        </div>
        ))
      }
    </div>
  );
};

export default CharactersList;