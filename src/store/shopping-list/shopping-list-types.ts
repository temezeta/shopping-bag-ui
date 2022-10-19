import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

export interface ShoppingListState {
    activeShoppingLists: ShoppingListDto[];
    inactiveShoppingLists: ShoppingListDto[];
}
