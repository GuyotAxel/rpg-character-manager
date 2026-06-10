import {
    findItemById
} from './itemUtils.js';

import {
    validModif
} from './gameData.js';

function formatItem(item)
{
    let formattedItem = 

`[${item.id}] ${item.name}

type : ${item.type}`;

    for (let a = 0; a < validModif.length; a ++)
    {
        if (validModif[a] in item)
            formattedItem += `\n${validModif[a]} : ${item[validModif[a]]}`;
    };

formattedItem += `\nclass : ${item.class}`;

    return(formattedItem);
};

export function displayItems(items)
{
    items.forEach(
        (item, index) => 
        {
            console.log(formatItem(item));

            if (index < items.length -1)
            {
                console.log("");
                console.log("----------------");
                console.log("");
            };
        }
    );
};