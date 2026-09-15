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

import {
    calculateDamage,
    takeDamage
} from './combatManager.js'

let characters = [];
let items = [];

const character = addCharacter(characters, "Arthas", "Warrior");
const character2 = addCharacter(characters, "Frieren", "Mage");

const item = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);
const item2 = addItem(items, "Padded Armor", "Armor", "all", "defense", 10);
const item3 = addItem(items, "Health Potion", "Consumable", "all", "heal", 10);
const item4 = addItem(items, "Magic Staff", "Weapon", "Mage", "attack", 20);
const item5 = addItem(items, "Wizard Robe", "Armor", "Mage", "defense", 50);

addItemToInventory(characters, items, character.id, item.id);
addItemToInventory(characters, items, character.id, item2.id);
addItemToInventory(characters, items, character.id, item3.id);
addItemToInventory(characters, items, character2.id, item2.id);
addItemToInventory(characters, items, character2.id, item3.id);
addItemToInventory(characters, items, character2.id, item4.id);
addItemToInventory(characters, items, character2.id, item5.id);

console.log(`\ncalculateDamage \n`)

let damage = calculateDamage(characters, items, character.id, character2.id);
console.log(damage);
equipItem(characters, items, character.id, item.id);
damage = calculateDamage(characters, items, character.id, character2.id);
console.log(damage);
equipItem(characters, items, character2.id, item2.id);
damage = calculateDamage(characters, items, character.id, character2.id);
console.log(damage);
equipItem(characters, items, character2.id, item5.id);
damage = calculateDamage(characters, items, character.id, character2.id);
console.log(damage);

console.log(`\ntakeDamage \n`)


console.log(takeDamage(characters, character.id, -80));
takeDamage(characters, character.id, 80);
console.log(character);
takeDamage(characters, character.id, 80);
console.log(character);

//displayCharacters([character], items);