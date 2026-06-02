import {
    addCharacter,
    //removeCharacter,
    //gainExperience,
    //levelUp,
    //updateCharacter
} from "../characterManager.js";
// import {
//     formatCharacter,
//     displayCharacters
// } from '../characterDisplay';

function test (message, found, target)
{
    if (found === target)
        return(console.log(`${message} is OK ✅`));
    else
        return(
    console.log(`${message} is KO ❌`),
    console.log(`found: ${found}`),
    console.log(`target: ${target}`)
    );
};

function runAddCharacter()
{
    let characters = [];

    console.log("--- TEST addCharacter ---");
    
    const character = addCharacter(characters, "Arthas", "Warrior");
    test("Test for id", character.id, 1);
    test("Test for name", character.name, "Arthas");
    test("Test for class", character.class, "Warrior");
    test("Test for level", character.level, 1);
    test("Test for experience", character.experience, 0);
    test("Test for Warrior hp", character.hp, 120);
    const character2 = addCharacter(characters, "Frieren", "Mage");
    test("Test for Mage hp", character2.hp, 80);
    const character3 = addCharacter(characters, "Aladdin", "Rogue");
    test("Test for Rogue hp", character3.hp, 100);
}

function runAddCharacterInvalid()

{
    let characters = [];

    console.log("--- TEST invalid addCharacter ---")

    const character4 = addCharacter(characters, "", "Warrior");
    test("Test for invalid name", character4, undefined);
    const character5 = addCharacter(characters, "     ", "Warrior");
    test("Test for invalid name", character5, undefined);
    const character6 = addCharacter(characters, "Arthas", "Bard");
    test("Test for invalid name", character6, undefined);
};

runAddCharacter();
runAddCharacterInvalid();