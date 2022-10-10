import { OfficeDto } from '../../models/office/OfficeDto';
import ApiClient from '../client';

export const getAllOffices = async (): Promise<OfficeDto[]> => {
    const response = await ApiClient.get('office/get/all');
    if (!response.ok) {
        return [];
    }
    return (await response.json()) as OfficeDto[];
};
