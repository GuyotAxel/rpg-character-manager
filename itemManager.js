import {
    validClasses
} from './characterManager.js';

let idCountItems = 0;

const validType =
[
    "Weapon",
    "Armor",
    "Consumable"
];

const validModif =
[
    "attack",
    "defense",
    "hp"
];

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

export function removeItem()
{

};