import { ItemDto } from '../models/shopping-list/ItemDto';

export const sortByItemName = (a: ItemDto, b: ItemDto): number => {
    if (typeof a.name === 'undefined' || typeof b.name === 'undefined')
        return 0;
    else return a.name.localeCompare(b.name);
};
