import {
    findCharacterById,
    findCharacterIndex
} from './characterUtils.js';

import {
    validClasses,
    classStats
} from './gameData.js'

let idCount = 0

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
        baseStats:
        {
            hp: classStats[characterClass].hp,
            attack: classStats[characterClass].attack,
            defense: classStats[characterClass].defense
        },
        currentHp: classStats[characterClass].hp,
        inventory: [],
        equipment:
        {
            weapon: null,
            armor: null
        }
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
        character.baseStats.hp += 10;
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

        const hpAdded = character.baseStats.hp - classStats[character.class].hp;

        character.class = value;
        character.baseStats.hp = classStats[value].hp + hpAdded;
        return(character);
        // dans les prochaines versions : penser à vider équipement.
    }

    if (option === "level")
    {
        if (typeof value !== "number" || value < 1)
            return(undefined);

        const hpGrowth = (character.level - 1) * 10;

        character.baseStats.hp -= hpGrowth;
        character.level = value;
        character.baseStats.hp += (value - 1) * (10);
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