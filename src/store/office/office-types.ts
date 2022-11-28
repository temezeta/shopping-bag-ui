import { ModifyOfficeDto } from '../../models/office/ModifyOfficeDto';
import { OfficeDto } from '../../models/office/OfficeDto';

export interface OfficeState {
    offices: OfficeDto[];
}

export interface AddOfficePayload {
    data: ModifyOfficeDto;
}

export interface EditOfficePayload {
    data: ModifyOfficeDto;
    officeId: number;
}
