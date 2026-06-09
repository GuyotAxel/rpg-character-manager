import {
    addItem
} from '../itemManager.js'

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

    const item1 = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);

    test("item name", item1.name, "Iron Sword");
    test("item type", item1.type, "Weapon");
    test("item class", item1.class, "Warrior");
    test("item attack exists", "attack" in item1, true);
    test("item modificator value", item1["attack"], 10);
    test("items[] is updated", items.length, 1);
};

runInvalidAddItem();
runAddItem();

