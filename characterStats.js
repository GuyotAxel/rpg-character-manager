import {
    findCharacterById
} from './characterUtils.js';

import {
    findItemById
} from './itemUtils.js';

function getEquipmentBonus(items, character, stat)
{
    let totalEquipmentStat = 0;
    const keys = Object.keys(character.equipment);

    for (let a = 0; a < keys.length; a ++) 
    {                 
        let item = findItemById(items, character.equipment[keys[a]]);

        if (item === undefined)
            continue;

        if (stat in item)
            totalEquipmentStat += item[stat];
    };
    return(totalEquipmentStat);
};

export function getCharacterAttack(characters, items, characterId)
{
    const character = findCharacterById (characters, characterId);
    if (character === undefined)
        return (undefined);

    const equipmentAttack = getEquipmentBonus(items, character, "attack")
    const totalAttack = character.baseStats.attack + equipmentAttack;

    return(totalAttack);
};

export function getCharacterDefense(characters, items, characterId)
{
    const character = findCharacterById (characters, characterId);
    if (character === undefined)
        return (undefined);

    const equipmentDefense = getEquipmentBonus (items, character, "defense");
    const totalDefense = character.baseStats.defense + equipmentDefense;

    return(totalDefense);
};

export function getCharacterHp(characters, items, characterId)
{
    const character = findCharacterById (characters, characterId);
    if (character === undefined)
        return (undefined);

    const equipmentHp = getEquipmentBonus (items, character, "hp");
    const totalHp = character.baseStats.hp + equipmentHp;

    return(totalHp);
};

export function getCharacterStats(characters, items, characterId)
{
    const character = findCharacterById (characters, characterId);
    if (character === undefined)
        return (undefined);

    const totalStats =
    {
        hp: getCharacterHp(characters, items, characterId),
        attack: getCharacterAttack(characters, items, characterId),
        defense: getCharacterDefense(characters, items, characterId)
    };
    
    return(totalStats);
};