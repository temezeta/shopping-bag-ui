import { OfficeDto } from '../office/OfficeDto';
import { UserRoleDto } from './UserRoleDto';

export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userRoles: UserRoleDto[];
    homeOffice: OfficeDto;
}

export interface ItemAdderUserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    homeOffice: OfficeDto;
}
