export interface AddItemDto {
    name?: string;
    shopName?: string;
    url?: string;
    comment?: string;
    shoppingListId: number;
    userId: number;
}
