import { findItemById } from "./itemUtils.js";

function formatEquipment(character, items)
{
    const keys = Object.keys(character.equipment);

    const equipmentList = keys.map(key =>
    {                    
        if (character.equipment[key] === null)
        {
            return(`${key} : None`)
        }
        
        return(`${key} : ${findItemById(items, character.equipment[key]).name}`)      
    });

    return(equipmentList.join("\n- "))
};

export function formatCharacter(character, items)
{
    const inventoryList = character.inventory.map(item => findItemById(items, item).name);

    return(
`[${character.id}] ${character.name}

    class : ${character.class}
    level : ${character.level}
    XP : ${character.experience}
    HP : ${character.currentHp} / ${character.baseStats.hp}

    equipment :
    -----------
- ${formatEquipment(character, items)}
    
    inventory :
    -----------
- ${inventoryList.join("\n- ")}
    `
    );
};

export function displayCharacters(characters, items)
{
    if (characters.length < 1)
        return(undefined);

    characters.forEach(
        (character, index) =>
        {
            console.log(formatCharacter(character, items));

            if (index < characters.length - 1)
            {
                console.log("");
                console.log("----------------");
                console.log("");
            };
        }
    );
}