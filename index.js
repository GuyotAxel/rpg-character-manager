import {
    addCharacter,
    removeCharacter,
    removeCharacter,
    gainExperience,
    levelUp,
    updateCharacter
} from './characterManager.js';
// import {
//     formatCharacter,
//     displayCharacters
// } from './characterDisplay';

let characters = [];

addCharacter(characters, "Arthas", "Warrior");
console.log(characters);
removeCharacter(characters, 1)
console.log(characters);
// removeCharacter();
// gainExperience();
// levelUp();
// updateCharacter();
// formatCharacter();
// displayCharacters();