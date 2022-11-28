import { ModifyOfficeDto } from '../../models/office/ModifyOfficeDto';
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

export const addOffice = async (
    data: ModifyOfficeDto
): Promise<OfficeDto | null> => {
    const response = await ApiClient.post(`office/add`, data);
    if (!response.ok) {
        await showResponseError(response);
        return null;
    }
    return (await response.json()) as OfficeDto;
};

export const editOffice = async (
    data: ModifyOfficeDto,
    officeId: number
): Promise<OfficeDto> => {
    const response = await ApiClient.put(`Office?officeId=${officeId}`, data);
    if (!response.ok) {
        await showResponseError(response);
    }
    return (await response.json()) as OfficeDto;
};

export const deleteOffice = async (officeId: number): Promise<boolean> => {
    const response = await ApiClient.delete(
        `Office?officeId=${officeId}`,
        officeId
    );
    if (!response.ok) {
        await showResponseError(response);
    }
    return response.ok;
};
