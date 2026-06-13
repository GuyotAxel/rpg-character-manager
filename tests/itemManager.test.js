import {
    addItem,
    addItemToInventory,
    removeItemFromInventory
} from '../itemManager.js';

import {
    displayItems
} from '../itemDisplay.js';

import {
    addCharacter,
    removeCharacter,
    gainExperience,
    levelUp,
    updateCharacter
} from '../characterManager.js';

import {
    formatCharacter,
    displayCharacters
} from '../characterDisplay.js';

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

function runInvalidAddItem()
{
    let items = [];

    console.log("---- TEST runInvalidAddItem ----");

    test("test blank name are invalids", addItem(items, "   ", "Weapon", "Warrior", "attack", 10), undefined);
    test("test invalid type", addItem(items, "Iron Sword", "voiture", "Warrior", "attack", 10), undefined);
    test("test invalid class", addItem(items, "Iron Sword", "Weapon", "Bard", "attack", 10), undefined);
    test("test invalid modificator", addItem(items, "Iron Sword", "Weapon", "Warrior", "dodge", 10), undefined);
    test("test invalid modificator value", addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", "ten"), undefined);
};

function runAddItem()
{
    let items = [];

    console.log("---- TEST runAddItem ----");

    const item = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);

    test("item name", item.name, "Iron Sword");
    test("item type", item.type, "Weapon");
    test("item class", item.class, "Warrior");
    test("item attack exists", "attack" in item, true);
    test("item modificator value", item["attack"], 10);
    test("items[] is updated", items.length, 1);
};

function runAddItemToInventory()
{
    let items = [];

    console.log("---- TEST runAddItemToInventory ----");

    const item2 = addItem(
        items,
        "Iron Sword",
        "Weapon",
        "Warrior",
        "attack",
        10
    );

    let characters = [];
    const character = addCharacter(characters, "Arthas", "Warrior");
    
    addItemToInventory(characters, items, character.id, item2.id);
    test("Test item added to inventory", character.inventory[0], item2.id);
    addItemToInventory(characters, items, 999, item2.id);
    addItemToInventory(characters, items, character.id, 999);
    test("Test invalid item can't be added to invalid character's inventory", character.inventory.length, 1);
    test("invalid character returns undefined", addItemToInventory(characters, items, 999, item2.id), undefined);
    test("invalid item returns undefined", addItemToInventory(characters, items, character.id, 999), undefined);
}

function runRemoveItemFromInventory()
{
    let items = [];
    let characters = [];

    console.log("---- TEST removeItemFromInventory ----");

    const item3 = addItem(
        items,
        "Iron Sword",
        "Weapon",
        "Warrior",
        "attack",
        10
    );

    const character2 = addCharacter(characters, "Arthas", "Warrior");

    addItemToInventory(characters, items, character2.id, item3.id); 
    removeItemFromInventory(characters, items, character2.id, item3.id);
    test("Test item is removed from inventory", character2.inventory.length, 0);
    
    const item4 = addItem(
        items,
        "Iron Sword",
        "Weapon",
        "Warrior",
        "attack",
        10
    );
    character2.equipment.weapon = item4.id;
    addItemToInventory(characters, items, character2.id, item4.id);    
    test("Test equiped item can't be removed from inventory", removeItemFromInventory(characters, items, character2.id, item4.id), undefined);
    test("inventory length unchanged after invalid removal",character2.inventory.length,1);
    test("invalid character returns undefined", removeItemFromInventory(characters, items, 999, item4.id), undefined);
    test("invalid item returns undefined", removeItemFromInventory(characters, items, character2.id, 999), undefined);
    test("removing item not in inventory returns undefined", removeItemFromInventory(characters, items, character2.id, item3.id), undefined);
}

runInvalidAddItem();
runAddItem();
runAddItemToInventory();
runRemoveItemFromInventory();