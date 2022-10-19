import { ItemDto } from './ItemDto';

export interface ShoppingListDto {
    id: number;
    name: string;
    comment?: string;
    ordered: boolean;
    createdDate: string;
    startDate?: string;
    dueDate?: string;
    expectedDeliveryDate?: string;
    items: ItemDto[];
}
