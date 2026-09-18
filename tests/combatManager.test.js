import {
    calculateDamage,
    takeDamage,
    isDead,
    attack
} from '../combatManager.js'

import {
    addCharacter
} from '../characterManager.js';

import {
    addItemToInventory,
    addItem,
    equipItem
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

function runCalculateDamage ()
{
    let characters = [];
    let items = [];

    console.log("\n--- TEST calculateDamage ---\n");

    const arthas = addCharacter(characters, "Arthas", "Warrior");
    const frieren = addCharacter(characters, "Frieren", "Mage");

    const ironSword = addItem(items, "Iron Sword", "Weapon", "Warrior", "attack", 10);
    const paddedArmor = addItem(items, "Padded Armor", "Armor", "all", "defense", 10);
    const wizardRobe = addItem(items, "Wizard Robe", "Armor", "Mage", "defense", 20);

    test("Invalid attacker", calculateDamage(characters, items, 999, frieren.id), undefined);
    test("Invalid target", calculateDamage(characters, items, arthas.id, 999), undefined);
    test("Base damage without equipment", calculateDamage(characters, items, arthas.id, frieren.id), 1);
    addItemToInventory(characters, items, arthas.id, ironSword.id);
    equipItem(characters, items, arthas.id, ironSword.id);
    test("Weapon bonus increases attack damage", calculateDamage(characters, items, arthas.id, frieren.id), 10);
    addItemToInventory(characters, items, frieren.id, paddedArmor.id);
    equipItem(characters, items, frieren.id, paddedArmor.id);
    test("Armor bonus increases defense", calculateDamage(characters, items, arthas.id, frieren.id), 1);
    addItemToInventory(characters, items, frieren.id, wizardRobe.id);
    equipItem(characters, items, frieren.id, wizardRobe.id);
    test("Minimum damage is always 1", calculateDamage(characters, items, arthas.id, frieren.id), 1);
};

function runTakeDamage()
{
    let characters = []

    console.log("\n--- TEST takeDamage ---\n");
    
    const arthas = addCharacter(characters, "Arthas", "Warrior");

    test("Invalid character", takeDamage(characters, 999, 30), undefined);
    test("Damage can't be negative", takeDamage(characters, arthas.id, -30), undefined);
    test("Damage must be a number", takeDamage(characters, arthas.id, "Hello"), undefined);
    test("Character takes the expected amount of damage", takeDamage(characters, arthas.id, 30).currentHp, 90);
    test("Current HP can't go below 0", takeDamage(characters, arthas.id, 150).currentHp, 0);
}

function runIsDead()
{
    let characters = [];

    console.log("\n--- TEST isDead ---\n");

    const arthas = addCharacter(characters, "Arthas", "Warrior");

    test("Invalid character", isDead(characters, 999), undefined);
    test("Character is alive", isDead(characters, arthas.id), false);
    arthas.currentHp = 0;
    test("Character is dead", isDead(characters, arthas.id), true);
};

function runAttack()
{
    let characters = [];
    let items = [];

    console.log("\n--- TEST attack ---\n");

    const arthas = addCharacter(characters, "Arthas", "Warrior");
    const frieren = addCharacter(characters, "Frieren", "Mage");

    const doomSword = addItem(items, "Doom Sword", "Weapon", "Warrior", "attack", 150);

    test("Invalid attacker", attack(characters, items, 999, frieren.id), undefined);
    test("Invalid target", attack(characters, items, arthas.id, 999), undefined);
    test("Target takes the expected amount of damage", attack(characters, items, arthas.id, frieren.id).damage, 1);

    let fight = attack(characters, items, arthas.id, frieren.id);

    test("Attack reduces target's current HP", frieren.currentHp, 78);
    test("Attack returns the correct target", fight.target, `[${frieren.id}] ${frieren.name}`);
    test("Attack returns the correct damage", fight.damage, 1);
    test("Target survives the attack", fight.targetDied, false);

    addItemToInventory(characters, items, arthas.id, doomSword.id);
    equipItem(characters, items, arthas.id, doomSword.id);

    fight = attack(characters, items, arthas.id, frieren.id);

    test("Lethal attack reduces HP to 0", frieren.currentHp, 0);
    test("Lethal attack kills the target", fight.targetDied, true);
}

runCalculateDamage();
runTakeDamage();
runIsDead();
runAttack();