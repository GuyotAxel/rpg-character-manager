import {
    getCharacterAttack,
    getCharacterDefense,
    getCharacterHp,
    getCharacterCurrentHp,
    getCharacterStats
} from './characterStats.js';
import { 
    findCharacterById
} from './characterUtils.js';

export function calculateDamage(characters, items, attackerId, targetId)
{
    const attacker = findCharacterById(characters, attackerId);

    if (attacker === undefined)
        return(undefined);

    const target = findCharacterById(characters, targetId);

    if (target === undefined)
        return(undefined);

    const damage = getCharacterAttack(characters, items, attackerId);
    const defense = getCharacterDefense(characters, items, targetId);
    let totalDamage = damage - defense;

    if (totalDamage < 1)
        totalDamage = 1;

    return(totalDamage);
};

export function takeDamage(characters, targetId, damage)
{
    const target = findCharacterById(characters, targetId);

    if (target === undefined)
        return(undefined);
    
    if (typeof damage !== "number")
        return(undefined);
    
    if (damage < 0)
        return(undefined);

    target.currentHp -= damage;

    if (target.currentHp < 0)
        target.currentHp = 0;

    return(target);
};

export function isDead(characters, characterId)
{
    const character = findCharacterById(characters, characterId);
    if (character === undefined)
        return(undefined);

    return(getCharacterCurrentHp(characters, characterId) === 0);
};

export function attack(characters, items, attackerId, targetId)
{
    const attacker = findCharacterById(characters, attackerId);

    if (attacker === undefined)
        return(undefined);

    const target = findCharacterById(characters, targetId);

    if (target === undefined)
        return(undefined);

    const damage = calculateDamage(characters, items, attackerId, targetId);
   
    takeDamage(characters, target.id, damage)

    const targetDied = isDead(characters, target.id)

    const result = 
    {
        target: `[${target.id}] ${target.name}`,
        damage: damage,
        targetDied: targetDied
    };

    return(result)
};