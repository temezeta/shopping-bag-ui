import { AddItemDto } from '../../models/shopping-list/AddItemDto';
import { CheckedItemDto } from '../../models/shopping-list/CheckedItemDto';
import { ModifyItemDto } from '../../models/shopping-list/ModifyItemDto';
import { ModifyShoppingListDto } from '../../models/shopping-list/ModifyShoppingListDto';
import { OrderedAmountDto } from '../../models/shopping-list/OrderedAmountDto';
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

export interface GetListByIdPayload {
    listId: number;
    isEditing?: boolean;
}

export interface SetOrderedAmountPayload {
    data: OrderedAmountDto;
    listId: number;
}

export interface CheckStatusPayload {
    data: CheckedItemDto;
    listId: number;
}
