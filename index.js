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
    addItem
} from './itemManager.js';

let characters = [];
let items = [];

const character = addCharacter(characters, "Arthas", "Warrior");
const character2 = addCharacter(characters, "Frieren", "Mage");
const character3 = addCharacter(characters, "Aladdin", "Rogue");

//displayCharacters(characters);
// removeCharacter();
// gainExperience();
// levelUp();
// updateCharacter();
// formatCharacter();
// displayCharacters();

const item1 = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);
console.log(items)