export function formatCharacter(character)
{
    return(
`[${character.id}] ${character.name}

class : ${character.class}
level : ${character.level}
XP : ${character.experience}
HP : ${character.hp}`
    );
};

export function displayCharacters(characters)
{
    if (characters.length < 1)
        return(undefined);

    characters.forEach(
        (character, index) =>
        {
            console.log(formatCharacter(character));

            if (index < characters.length - 1)
            {
                console.log("");
                console.log("----------------");
                console.log("");
            };
        }
    );
}