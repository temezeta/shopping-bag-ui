import { ItemDto } from '../models/shopping-list/ItemDto';
import { UserDto } from '../models/user/UserDto';
import { isAdmin } from './user-helper';

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

export const sortByItemLikes = (
    itemsList: ItemDto[],
    descending: boolean
): ItemDto[] => {
    const sortedItems: ItemDto[] = [...itemsList].sort(
        (a, b) => a.usersWhoLiked.length - b.usersWhoLiked.length
    );
    if (descending) {
        return sortedItems;
    } else return sortedItems.reverse();
};

const compareRoles = (a: UserDto, b: UserDto): number => {
    const isAAdmin = isAdmin(a);
    const isBAdmin = isAdmin(b);
    if (isAAdmin && !isBAdmin) return -1;
    if (!isAAdmin && isBAdmin) return 1;
    return 0;
};

const compareRolesAndName = (a: UserDto, b: UserDto): number => {
    const sortByRole = compareRoles(a, b);
    if (sortByRole !== 0) return sortByRole;
    const sortByLastName = a.lastName.localeCompare(b.lastName);
    return sortByLastName !== 0
        ? sortByLastName
        : a.firstName.localeCompare(b.firstName);
};

export const sortByUserRoleAndName = (userList: UserDto[]): UserDto[] => {
    return [...userList].sort(compareRolesAndName);
};
