import { OfficeDto } from '../../models/office/OfficeDto';
import { ModifyUserDto, UserDto } from '../../models/user/UserDto';
import { UserRoleDto } from '../../models/user/UserRoleDto';

export interface UserState {
    currentUser?: UserDto;
    sessionOffice?: OfficeDto;
    users: UserDto[];
    roles: UserRoleDto[];
}

export interface ModifyUserPayload {
    userId: number;
    data: ModifyUserDto;
}
