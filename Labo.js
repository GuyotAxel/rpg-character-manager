export function findCharacterById(characters, id)
{
    return(characters.find(character => character.id === id));
};

let idCount = 0

export function addCharacter(characters, name, characterClass)
{
    const validClasses =
    [
        "Warrior",
        "Mage",
        "Rogue"
    ];

    const classHp =
    {
        Warrior: 120,
        Mage: 80,
        Rogue: 100
    };

    if (name.trim().length < 1)
        return(undefined);

    if (!validClasses.includes(characterClass))
        return(undefined);

    const character =
    {
        id: idCount + 1,
        name: name,
        class: characterClass,
        level: 1,
        experience: 0,
        hp : classHp[characterClass]
    };
    idCount++;
    characters.push(character);
    return(character);
};

export function removeCharacter(characters, id)
{
    for (let a = 0; a < characters.length; a ++)
    {
        if (characters[a].id === id)
        {
            characters.splice(a, 1);
            return(characters[a]);
        }
    }
    return(undefined);
};

export function gainExperience(characters, id, experience)
{
    let character = findCharacterById(characters, id);

    character.experience += experience;
    return(character);
};

export function levelUp(characters, id)
{
    let character = findCharacterById(characters, id);

    while (character.experience >= 100)
    {
        character.experience -= 100;
        character.level++;
        character.hp += 10;
    };
    return(character);
};

let characters = []

const character7 = addCharacter(characters, "Arthas", "Warrior");
const character8 = addCharacter(characters, "Frieren", "Mage");
const character9 = addCharacter(characters, "Aladdin", "Rogue");

gainExperience(characters, character8.id, 400);
console.log(characters);

levelUp(characters, character8.id);
console.log(characters);