import { Url } from 'url';

export interface AddItemDto {
    name: string;
    shopName: string;
    url: Url;
    comment: string;
    shoppingListId: any;
    userId: number;
}
