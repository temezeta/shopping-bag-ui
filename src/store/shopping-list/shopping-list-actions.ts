import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import ApiClient from '../client';
import { ModifyShoppingListDto } from '../../models/shopping-list/ModifyShoppingListDto';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import { ModifyItemDto } from '../../models/shopping-list/ModifyItemDto';
import { AddItemDto } from '../../models/shopping-list/AddItemDto';

export const getShoppingListsByOfficeId = async (
    officeId: number
): Promise<ShoppingListDto[] | null> => {
    const response = await ApiClient.get(`shoppinglist?officeId=${officeId}`);
    if (!response.ok) {
        return null;
    }

    return (await response.json()) as ShoppingListDto[];
};

export const addShoppingList = async (
    data: AddShoppingListDto
): Promise<ShoppingListDto | null> => {
    const response = await ApiClient.post(`shoppinglist`, data);
    if (!response.ok) {
        return null;
    }

    return (await response.json()) as ShoppingListDto;
};

export const addItem = async (
    data: AddItemDto,
    listId: number
): Promise<AddItemDto | null> => {
    const response = await ApiClient.post(`item?listId=${listId}`, data);
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as AddItemDto;
};

export const removeItem = async (itemId: number): Promise<boolean> => {
    const response = await ApiClient.delete(`Item/${itemId}`, '');
    return response.ok;
};

export const modifyItem = async (
    data: ModifyItemDto,
    itemId: number
): Promise<ItemDto | null> => {
    const response = await ApiClient.put(`item/${itemId}`, data);
    if (!response.ok) {
        return null;
    }

    return (await response.json()) as ItemDto;
};

export const modifyShoppingList = async (
    data: ModifyShoppingListDto,
    listId: number
): Promise<ShoppingListDto | null> => {
    const response = await ApiClient.put(
        `shoppinglist?shoppingListId=${listId}`,
        data
    );
    if (!response.ok) {
        return null;
    }

    return (await response.json()) as ShoppingListDto;
};

export const removeShoppingList = async (
    listId: number
): Promise<number | null> => {
    const response = await ApiClient.delete(
        `shoppinglist?shoppingListId=${listId}`,
        null
    );

    if (!response.ok) {
        return null;
    }

    return listId;
};

export const getShoppingListById = async (
    listId: number
): Promise<ShoppingListDto | null> => {
    const response = await ApiClient.get(
        `shoppinglist/byid?shoppingListId=${listId}`
    );

    if (!response.ok) {
        return null;
    }

    return (await response.json()) as ShoppingListDto;
};
