import { AddItemDto } from '../../models/shopping-list/AddItemDto';
import { ModifyItemDto } from '../../models/shopping-list/ModifyItemDto';
import { ModifyShoppingListDto } from '../../models/shopping-list/ModifyShoppingListDto';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

export interface ShoppingListMap {
    [key: number]: ShoppingListDto;
}

export interface ShoppingListState {
    shoppingLists: ShoppingListMap;
    activeShoppingListId: number | false;
    editShoppingList?: ShoppingListDto;
}

export interface ModifyPayload {
    data: ModifyShoppingListDto;
    listId: number;
}

export interface AddItemPayload {
    data: AddItemDto;
    listId: number;
}

export interface ModifyItemPayload {
    data: ModifyItemDto;
    itemId: number;
}

export interface LikeStatusPayload {
    data: boolean;
    itemId: number;
}

export interface SetOrderedAmountPayload {
    amountOrdered: number;
    itemId: number;
}

export interface GetListByIdPayload {
    listId: number;
    isEditing?: boolean;
}
