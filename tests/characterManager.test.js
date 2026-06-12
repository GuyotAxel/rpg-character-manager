import {
    addCharacter,
    removeCharacter,
    gainExperience,
    levelUp,
    updateCharacter
} from "../characterManager.js";

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
    test("Test for attack", character.attack, 10);
    test("Test for defense", character.defense, 10);
    test("Test for inventory", character.inventory.length, 0);
    test("Test for equipement", character.equipment.weapon, null);
    test("Test for equipement", character.equipment.armor, null);
    const character2 = addCharacter(characters, "Frieren", "Mage");
    test("Test for Mage hp", character2.hp, 80);
    const character3 = addCharacter(characters, "Aladdin", "Rogue");
    test("Test for Rogue hp", character3.hp, 100);
};

function runAddCharacterInvalid()
{
    let characters = [];

    console.log("--- TEST invalid addCharacter ---");

    const character4 = addCharacter(characters, "", "Warrior");
    test("Test for invalid name empty", character4, undefined);
    const character5 = addCharacter(characters, "     ", "Warrior");
    test("Test for invalid name space", character5, undefined);
    const character6 = addCharacter(characters, "Arthas", "Bard");
    test("Test for invalid class", character6, undefined);
};

function runRemoveCharacter()
{
    let characters = [];

    console.log("--- TEST removeCharacter ---");

    const character7 = addCharacter(characters, "Arthas", "Warrior");
    const character8 = addCharacter(characters, "Frieren", "Mage");
    const character9 = addCharacter(characters, "Aladdin", "Rogue");

    removeCharacter(characters, character8.id);
    test("TEST for removeCharacter", characters.find(character => character.id === character8.id), undefined);
};

function runGainExperience()
{
    let characters = [];

    console.log("--- TEST gainExperience ---");

    const character10 = addCharacter(characters, "Frieren", "Mage");

    gainExperience(characters, character10.id, 400);
    test("TEST for gainExperience", character10.experience, 400);
    gainExperience(characters, character10.id, -500);
    test("TEST Experience gain can't be negative", character10.experience >= 0, true);
};

function runLevelUp()
{
    let characters = [];

    console.log("--- TEST levelUp ---");

    const character11 = addCharacter(characters, "Frieren", "Mage");

    gainExperience(characters, character11.id, 400);
    levelUp(characters, character11.id);
    test("TEST for levelUp, experience is < 100", character11.experience < 100, true);
    test("TEST for levelUp, level has increased", character11.level, 5);
    test("TEST hp has increased with level up", character11.hp, 120);
};

function runUpdateCharacter()
{
    let characters = [];

    console.log("--- TEST updateCharacter ---");

    const character12 = addCharacter(characters, "Arthas", "Warrior");
    const character13 = addCharacter(characters, "Frieren", "Mage");
    const character14 = addCharacter(characters, "Aladdin", "Rogue");

    test("updateCharacter can't update id", updateCharacter(characters, character13.id, "id", 45), undefined);
    updateCharacter(characters, character13.id, "name", "Morrigan");
    test("updateCharacter can change name", character13.name, "Morrigan");
    updateCharacter(characters, character13.id, "class", "Rogue");
    test("updateCharacter can change class", character13.class, "Rogue");
    test("update hp from class modified", character13.hp, 100);
    updateCharacter(characters, character13.id, "level", 25);
    test("updateCharacter can change level", character13.level, 25);
    test("update hp from level modified", character13.hp, 340);
    updateCharacter(characters, character13.id, "experience", 400);
    test("updateCharacter can change experience", character13.experience, 400);
};

runAddCharacter();
runAddCharacterInvalid();
runRemoveCharacter();
runGainExperience();
runLevelUp();
runUpdateCharacter();