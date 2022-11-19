import { OfficeDto } from '../../models/office/OfficeDto';
import { ModifyUserDto, UserDto } from '../../models/user/UserDto';

export interface UserState {
    currentUser?: UserDto;
    sessionOffice?: OfficeDto;
}

export interface ModifyUserPayload {
    userId: number;
    data: ModifyUserDto;
}
