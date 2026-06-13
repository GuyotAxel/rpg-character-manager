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
    if (character.equipment.weapon === itemId || character.equipment.armor === itemId)
        return(undefined);

    const itemIndex = 
    character.inventory.findIndex(
        item => item === itemId
    );

    character.inventory.splice(itemIndex, 1);
    return(character.inventory);
};