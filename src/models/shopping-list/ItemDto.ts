import { RedactedUserDto } from '../user/UserDto';

export interface ItemDto {
    id: number;
    name?: string;
    url?: string;
    shopName?: string;
    comment?: string;
    isChecked: boolean;
    amountOrdered: number;
    shoppingListId: number;
    itemAdder: RedactedUserDto;
    usersWhoLiked: RedactedUserDto[];
}
