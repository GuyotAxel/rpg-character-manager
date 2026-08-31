import { getCharacterHp } from './characterStats.js';
import { 
    findCharacterById 
} from './characterUtils.js';

import {
    validClasses,
    validType,
    validModif
} from './gameData.js';

import {
    findItemById
} from './itemUtils.js';

let idCountItems = 0;

export function addItem(items, name, type, classRestriction, modifType, modifValue)
{
    if (name.trim().length < 1)
        return(undefined);
    if (!validType.includes(type))
        return(undefined);
    if (!validClasses.includes(classRestriction))
        return(undefined);
    if (!validModif.includes(modifType))
        return(undefined);
    if (typeof modifValue !== "number")
        return(undefined);

    let item =
    {
        id: idCountItems + 1,
        name: name,
        type: type,
        [modifType]: modifValue,
        class: classRestriction
    };

    idCountItems++;
    items.push(item);
    return(item);
};

export function addItemToInventory(characters, items, characterId, itemId)
{
    const character = findCharacterById(characters, characterId);
    
    if (character === undefined)
        return(undefined);
    if (findItemById(items, itemId) === undefined)
        return(undefined);

    character.inventory.push(itemId);
    return(character);
}

export function removeItemFromInventory(characters, items, characterId, itemId)
{
    const character = findCharacterById(characters, characterId);
    
    if (character === undefined)
        return(undefined);
    if (findItemById(items, itemId) === undefined)
        return(undefined);
    if (!character.inventory.includes(itemId))
        return(undefined);

    const itemIndex = 
    character.inventory.findIndex(
        item => item === itemId
    );

    character.inventory.splice(itemIndex, 1);
    return(character.inventory);
};

export function equipItem(characters, items, characterId, itemId)
{
    const character = findCharacterById(characters, characterId);
    const item = findItemById(items, itemId);

    if (character === undefined)
        return(undefined);
    if (item === undefined)
        return(undefined);
    if (!character.inventory.includes(itemId))
        return(undefined);

    const itemType = item.type.toLowerCase();

    if (!(itemType in character.equipment))
        return(undefined);
    if (item.class !== character.class && item.class !== "all")
        return(undefined);
    
    if (character.equipment[itemType] !== null)
    {
        addItemToInventory(characters, items, characterId, character.equipment[itemType]);
        character.equipment[itemType] = null;
    }
    const itemIndex = character.inventory.findIndex(
        item => item === itemId
    );

    character.equipment[itemType] = itemId;
    character.inventory.splice(itemIndex, 1);
    return(character);
};

export function unequipItem(characters, characterId, type)
{
    const character = findCharacterById(characters, characterId);

    if (character === undefined)
        return(undefined);
    if (!(type in character.equipment))
        return(undefined);
    if (character.equipment[type] === null)
        return(undefined);

    character.inventory.push(character.equipment[type]);
    character.equipment[type] = null;
    return(character);
};

export function healCharacter(characters, items, characterId, healAmount)
{
    const character = findCharacterById(characters, characterId);
    if (character === undefined)
        return(undefined);
    if (healAmount < 0)
        return(undefined);
    const maxHp = getCharacterHp(characters, items, characterId)
    character.currentHp += healAmount;
    if (character.currentHp > maxHp)
        character.currentHp = maxHp;
    return(character);
}

export function useItem(characters, items, characterId, itemId)
{
    const character = findCharacterById(characters, characterId);
    if (character === undefined)
        return(undefined);
    const item = findItemById(items, itemId);
    if (item === undefined)
        return(undefined);
    if (!character.inventory.includes(itemId))
        return(undefined);
    if (item.type !== "Consumable")
        return(undefined);

    const keys = Object.keys(item);
    if (keys.includes("heal"))
    {
        healCharacter(characters, items, characterId, item.heal);
    }
    removeItemFromInventory(characters, items, characterId, itemId);
    return(character);
}