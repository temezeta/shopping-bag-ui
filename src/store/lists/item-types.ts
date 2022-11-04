import { AddItemDto } from '../../models/lists/AddItemDto';

export interface AddItemPayload {
    data: AddItemDto;
    listId: number;
}

export interface LikeStatusPayload {
    data: boolean;
    itemId: number;
}
