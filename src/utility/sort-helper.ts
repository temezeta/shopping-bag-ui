import { ItemDto } from '../models/shopping-list/ItemDto';

export enum SortType {
    Name,
    Likes,
    None,
}

export interface SortOptions {
    sortType: SortType;
    sortDescending: boolean;
}

const compareNames = (a: ItemDto, b: ItemDto): number => {
    if (a.name === undefined || b.name === undefined) return 0;
    else return a.name.localeCompare(b.name);
};

export const sortByItemName = (
    itemsList: ItemDto[],
    descending: boolean
): ItemDto[] => {
    const sortedItems: ItemDto[] = [...itemsList].sort(compareNames);
    if (descending) {
        return sortedItems;
    } else return sortedItems.reverse();
};
