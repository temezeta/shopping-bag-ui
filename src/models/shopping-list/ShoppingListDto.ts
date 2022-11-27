import { OfficeDto } from '../office/OfficeDto';
import { ItemDto } from './ItemDto';

export interface ShoppingListDto {
    id: number;
    name: string;
    comment?: string;
    ordered: boolean;
    createdDate: string;
    dueDate?: string;
    expectedDeliveryDate?: string;
    listDeliveryOffice: OfficeDto;
    items: ItemDto[];
}
