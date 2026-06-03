import {
    findCharacterById,
    findCharacterIndex
} from './characterUtils.js';

let idCount = 0

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

export function addCharacter(characters, name, characterClass)
{
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
    let index = findCharacterIndex(characters, id);

    if (index === undefined)
        return(undefined);

    let removedCharacter = characters[index];
    characters.splice(index, 1);
    return(removedCharacter);
}

export function gainExperience(characters, id, experience)
{
    if (experience < 0)
        return(undefined);

    let character = findCharacterById(characters, id);

    if (character === undefined)
        return(undefined);

    character.experience += experience;
    return(character);
};

export function levelUp(characters, id)
{
    let character = findCharacterById(characters, id);

    if (character === undefined)
    return(undefined);

    while (character.experience >= 100)
    {
        character.experience -= 100;
        character.level++;
        character.hp += 10;
    };
    return(character);
};

export function updateCharacter(characters, id, option, value)
{
    const character = findCharacterById(characters,id);

    if (character === undefined)
        return(undefined);

    if (option === "name")
    {
        if (value.trim().length < 1)
            return(undefined);

        character.name = value;
        return(character);
    }

    if (option === "class")
    {
        if (!validClasses.includes(value))
            return(undefined);

        const hpAdded = character.hp - classHp[character.class];

        character.class = value;
        character.hp = classHp[value] + hpAdded;
        return(character);
        // dans les prochaines versions : penser à vider équipement.
    }

    if (option === "level")
    {
        if (typeof value !== "number" || value < 1)
            return(undefined);

        const hpGrowth = (character.level - 1) * 10;

        character.hp -= hpGrowth;
        character.level = value;
        character.hp += (value - 1) * (10);
        return(character);
    }

    if (option === "experience")
    {
        character.experience = 0;
        gainExperience(characters, id, value);
        return(character);
    }

    else
        return(undefined);
};