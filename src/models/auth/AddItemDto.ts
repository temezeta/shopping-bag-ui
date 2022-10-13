import { Url } from 'url';

export interface AddItemDto {
    name: string;
    store: string;
    link: Url;
    comment: string;
}
