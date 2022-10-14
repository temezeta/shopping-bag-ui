import { Url } from 'url';

export interface AddItemDto {
    name: string;
    store: string;
    url: Url;
    comment: string;
}
