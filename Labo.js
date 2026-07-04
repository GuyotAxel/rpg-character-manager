import {
    addItem,
    addItemToInventory,
    removeItemFromInventory,
    equipItem
} from './itemManager.js';

import {
    displayItems
} from './itemDisplay.js';

import {
    addCharacter,
    removeCharacter,
    gainExperience,
    levelUp,
    updateCharacter
} from './characterManager.js';

import {
    formatCharacter,
    displayCharacters
} from './characterDisplay.js';

let characters = [];
let items = [];

const character = addCharacter(characters, "Arthas", "Warrior");

const item = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);
const item2 = addItem(items, "Padded Armor", "Armor", "Mage", "defense", 10);
const item3 = addItem(items, "Health Potion", "Consumable", "all", "hp", 10);
const item4 = addItem(items, "Broken Sword", "Weapon", "Warrior", "attack", 5);

addItemToInventory(characters, items, character.id, item.id);
addItemToInventory(characters, items, character.id, item2.id);
addItemToInventory(characters, items, character.id, item3.id);

character.equipment.weapon = item4.id;
equipItem(characters, items, character.id, item.id);
console.log(character)
//addItem(items, name, type, classRestriction, modifType, modifValue)