import {
    addItem,
    addItemToInventory,
    removeItemFromInventory,
    equipItem,
    unequipItem,
    useItem
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

import {
    getCharacterAttack,
    getCharacterDefense,
    getCharacterHp,
    getCharacterStats
} from './characterStats.js';

let characters = [];
let items = [];

const character = addCharacter(characters, "Arthas", "Warrior");
const character2 = addCharacter(characters, "Frieren", "Mage");

const item = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);
const item2 = addItem(items, "Padded Armor", "Armor", "Warrior", "defense", 10);
const item3 = addItem(items, "Health Potion", "Consumable", "all", "heal", 10);
const item4 = addItem(items, "Broken Sword", "Weapon", "Warrior", "attack", 5);
const item5 = addItem(items, "Magic Staff", "Weapon", "Mage", "attack", 20);

addItemToInventory(characters, items, character.id, item.id);
addItemToInventory(characters, items, character.id, item2.id);
addItemToInventory(characters, items, character.id, item3.id);
addItemToInventory(characters, items, character2.id, item5.id);

character.equipment.weapon = item4.id;
equipItem(characters, items, character.id, item.id);
equipItem(characters, items, character.id, item2.id);
equipItem(characters, items, character2.id, item5.id);

character.currentHp = 110;
displayCharacters([character], items);
useItem(characters, items, character.id, item3.id);
displayCharacters([character], items);

addItemToInventory(characters, items, character.id, item3.id);
character.currentHp = 120;
displayCharacters([character], items);
useItem(characters, items, character.id, item3.id);
displayCharacters([character], items);

addItemToInventory(characters, items, character.id, item3.id);
character.currentHp = 80;
displayCharacters([character], items);
useItem(characters, items, character.id, item3.id);
displayCharacters([character], items);
