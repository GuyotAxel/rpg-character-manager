import {
    addItem,
    addItemToInventory,
    removeItemFromInventory,
    equipItem,
    unequipItem
} from '../itemManager.js';

import {
    addCharacter,
    removeCharacter,
    gainExperience,
    levelUp,
    updateCharacter
} from '../characterManager.js';

import {
    getCharacterAttack,
    getCharacterDefense,
    getCharacterHp,
    getCharacterStats
} from '../characterStats.js';

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

function runGetCharacterAttack()
{
    let characters = [];
    let items = [];

    let character = addCharacter(characters, "Arthas", "Warrior");
    let item = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);
    let item2 = addItem(items, "Iron Armor", "Armor", "Warrior", "attack", 10);

    console.log("---- TEST runGetCharacterAttack ----")

    test("Is undefined if unknown character", getCharacterAttack(characters, items, 9999999), undefined);
    test("Base stats if no attack bonus from equipment", getCharacterAttack(characters, items, character.id), 10);
    addItemToInventory(characters, items, character.id, item.id);
    equipItem(characters, items, character.id, item.id);
    test("1 piece of equipment contribute to attack stat", getCharacterAttack(characters, items, character.id), 20);
    addItemToInventory(characters, items, character.id, item2.id);
    equipItem(characters, items, character.id, item2.id);
    test("Multiple pieces of equipment contribute to attack stat", getCharacterAttack(characters, items, character.id), 30);
}

function runGetCharacterDefense()
{
    let characters = [];
    let items = [];

    let character = addCharacter(characters, "Arthas", "Warrior");
    let item = addItem(items, "Iron Sword", "Weapon", "Warrior", "defense", 10);
    let item2 = addItem(items, "Iron Armor", "Armor", "Warrior", "defense", 10);

    console.log("---- TEST runGetCharacterDefense ----")

    test("Is undefined if unknown character", getCharacterDefense(characters, items, 9999999), undefined);
    test("Base stats if no defense bonus from equipment", getCharacterDefense(characters, items, character.id), 10);
    addItemToInventory(characters, items, character.id, item.id);
    equipItem(characters, items, character.id, item.id);
    test("1 piece of equipment contribute to defense stat", getCharacterDefense(characters, items, character.id), 20);
    addItemToInventory(characters, items, character.id, item2.id);
    equipItem(characters, items, character.id, item2.id);
    test("Multiple pieces of equipment contribute to defense stat", getCharacterDefense(characters, items, character.id), 30); 
}

function runGetCharacterHp()
{
    let characters = [];
    let items = [];

    let character = addCharacter(characters, "Arthas", "Warrior");
    let item = addItem(items, "Iron Sword", "Weapon", "Warrior", "hp", 10);
    let item2 = addItem(items, "Iron Armor", "Armor", "Warrior", "hp", 10);

    console.log("---- TEST runGetCharacterHp ----")

    test("Is undefined if unknown character", getCharacterHp(characters, items, 9999999), undefined);
    test("Base stats if no hp bonus from equipment", getCharacterHp(characters, items, character.id), 120);
    addItemToInventory(characters, items, character.id, item.id);
    equipItem(characters, items, character.id, item.id);
    test("1 piece of equipment contribute to hp stat", getCharacterHp(characters, items, character.id), 130);
    addItemToInventory(characters, items, character.id, item2.id);
    equipItem(characters, items, character.id, item2.id);
    test("Multiple pieces of equipment contribute to hp stat", getCharacterHp(characters, items, character.id), 140); 
}

function runGetCharacterStats()
{
    let characters = [];
    let items = [];

    let character = addCharacter(characters, "Arthas", "Warrior");
    let item = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);
    let item2 = addItem(items, "Iron Armor", "Armor", "Warrior", "defense", 10);
    let item3 = addItem(items, "Amulet", "Armor", "Warrior", "hp", 10);

    console.log("---- TEST runGetCharacterStats ----")

    test("Is undefined if unknown character", getCharacterStats(characters, items, 9999999), undefined);
    let arthasStats = getCharacterStats(characters, items, character.id)
    test("Base attack if no bonuses from equipment", arthasStats.attack, 10);
    test("Base defense if no bonuses from equipment", arthasStats.defense, 10);
    test("Base hp if no bonuses from equipment", arthasStats.hp, 120);
    addItemToInventory(characters, items, character.id, item.id);
    equipItem(characters, items, character.id, item.id);
    addItemToInventory(characters, items, character.id, item2.id);
    equipItem(characters, items, character.id, item2.id);
    arthasStats = getCharacterStats(characters, items, character.id)
    test("Equipment contribute to attack", arthasStats.attack, 20);
    test("Equipment contribute to defense", arthasStats.defense, 20);
    addItemToInventory(characters, items, character.id, item3.id);
    equipItem(characters, items, character.id, item3.id);
    arthasStats = getCharacterStats(characters, items, character.id)
    test("Equipment contribute to hp", arthasStats.hp, 130);
}

runGetCharacterAttack();
runGetCharacterDefense();
runGetCharacterHp();
runGetCharacterStats();