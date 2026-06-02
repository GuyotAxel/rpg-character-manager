export function findCharacterById(characters, id)
{
    return(characters.find(character => character.id === id));
};
//findCharacterByClass();
//findHighLevelCharacter();