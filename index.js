import {
    addCharacter,
    removeCharacter,
    gainExperience,
    levelUp,
    updateCharacter
} from `./characterManager.js`;
import {
    formatCharacter,
    displayCharacters
} from `./characterDisplay`;

let characters = {};

addCharacter();
removeCharacter();
gainExperience();
levelUp();
updateCharacter();
formatCharacter();
displayCharacters();