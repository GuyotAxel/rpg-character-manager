export function findCharacterById(characters, id)
{
    return(characters.find(character => character.id === id));
};

export function findCharacterIndex(characters, id)
{
    for (let a = 0; a < characters.length; a ++)
    {
        if (characters[a].id === id)
        {
            return(a);
        }
    }
    return(undefined);
};