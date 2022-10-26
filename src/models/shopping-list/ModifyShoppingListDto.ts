export interface ModifyShoppingListDto {
    name: string;
    comment?: string;
    dueDate?: string | null;
    expectedDeliveryDate?: string | null;
}
