import { OfficeDto } from '../../models/office/OfficeDto';
import ApiClient from '../client';
import { showResponseError } from '../ui/ui-slice';

export const getAllOffices = async (): Promise<OfficeDto[]> => {
    const response = await ApiClient.get('office/get/all');
    if (!response.ok) {
        await showResponseError(response);
        return [];
    }
    return (await response.json()) as OfficeDto[];
};
