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

const character = addCharacter(characters, "Arthas", "Warrior");
const character2 = addCharacter(characters, "Frieren", "Mage");
const character3 = addCharacter(characters, "Aladdin", "Rogue");

displayCharacters(characters);
// removeCharacter();
// gainExperience();
// levelUp();
// updateCharacter();
// formatCharacter();
// displayCharacters();