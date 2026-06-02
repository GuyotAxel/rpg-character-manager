import {
    findCharacterById
} from './characterUtils.js';

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

export function removeCharacter()
{

};

export function gainExperience()
{

};

export function levelUp()
{

};

export function updateCharacter()
{

};