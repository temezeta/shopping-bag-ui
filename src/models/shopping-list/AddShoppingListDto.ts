export interface AddShoppingListDto {
    name: string;
    comment?: string;
    dueDate?: string | null;
    expectedDeliveryDate?: string | null;
    officeId: number;
}
