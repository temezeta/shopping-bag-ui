import { ModifyShoppingListDto } from '../../models/shopping-list/ModifyShoppingListDto';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

export interface ShoppingListState {
    activeShoppingLists: ShoppingListDto[];
    inactiveShoppingLists: ShoppingListDto[];
}

export interface ModifyPayload {
    data: ModifyShoppingListDto;
    listId: number;
}
