import {
    addItem,
    addItemToInventory,
    removeItemFromInventory,
    equipItem,
    unequipItem,
    healCharacter
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
};

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
    test("invalid character returns undefined", removeItemFromInventory(characters, items, 999, item4.id), undefined);
    test("invalid item returns undefined", removeItemFromInventory(characters, items, character2.id, 999), undefined);
    test("removing item not in inventory returns undefined", removeItemFromInventory(characters, items, character2.id, item3.id), undefined);
};

function runEquipItem()
{
    let characters = [];
    let items = [];

    console.log("---- TEST equipItem ----");

    const character3 = addCharacter(characters, "Arthas", "Warrior");
    const item5 = addItem(
        items,
        "Iron Sword",
        "Weapon",
        "Warrior",
        "attack",
        10
    );
    const item6 = addItem(
        items,
        "Iron Staff",
        "Weapon",
        "Mage",
        "attack",
        10
    );
    const item7 = addItem(
        items,
        "Health Potion",
        "Consumable",
        "all",
        "hp",
        10
    );
    const item8 = addItem(
        items,
        "Steel Sword",
        "Weapon",
        "Warrior",
        "attack",
        20
    );
    const item9 = addItem(
        items,
        "Iron Dagger",
        "Weapon",
        "Rogue",
        "attack",
        10
    );
    addItemToInventory(characters, items, character3.id, item5.id);
    addItemToInventory(characters, items, character3.id, item6.id);
    addItemToInventory(characters, items, character3.id, item7.id);
    addItemToInventory(characters, items, character3.id, item8.id);
    test("check item is in inventory", equipItem(characters, items, character3.id, item9.id), undefined);
    test("check class restriction", equipItem(characters, items, character3.id, item6.id), undefined);
    test("check type restriction", equipItem(characters, items, character3.id, item7.id), undefined);
    equipItem(characters, items, character3.id, item5.id);
    test("Iron Sword is equipped", character3.equipment.weapon, item5.id);
    equipItem(characters, items, character3.id, item8.id);
    test("Steel Sword is equipped", character3.equipment.weapon, item8.id);
    test("Iron Sword is now in inventory", character3.inventory.includes(item5.id), true);
    test("Steel Sword is no longer in inventory", character3.inventory.includes(item8.id), false);
    test("inventory length hasn't changed", character3.inventory.length, 3);
};

function runUnequipItem()
{
    let characters = [];
    let items = [];

    console.log("---- TEST unequipItem ----");

    const character4 = addCharacter(
        characters,
        "Arthas",
        "Warrior"
    );
    const item10 = addItem(
        items,
        "Iron Sword",
        "Weapon",
        "Warrior",
        "attack",
        10
    );

    character4.equipment.weapon = item10.id;
    test("Check character exists", unequipItem(characters, 99999999, "weapon"), undefined);
    test("Type must be valid", unequipItem(characters, character4.id, "helmet"), undefined);
    test("weapon still equipped", character4.equipment.weapon, item10.id);
    test("Equipment slot must be occupied", unequipItem(characters, character4.id, "armor"), undefined);
    test("Inventory size hasn't changed", character4.inventory.length, 0);
    unequipItem(characters, character4.id, "weapon");
    test("Weapon is unequipped", character4.equipment.weapon, null);
    test("Previsously equipped weapon is in inventory", character4.inventory.includes(item10.id), true);
    test("Inventory size is updated", character4.inventory.length, 1);
}

function runHealCharacter()
{
    let characters = [];
    let items = [];

    console.log("---- TEST healCharacter ----");


}

runInvalidAddItem();
runAddItem();
runAddItemToInventory();
runRemoveItemFromInventory();
runEquipItem();
runUnequipItem();
//runHealCharacter();