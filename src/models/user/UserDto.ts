import { OfficeDto } from '../office/OfficeDto';
import { ReminderSettingsDto } from './ReminderDto';
import { UserRoleDto } from './UserRoleDto';

export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userRoles: UserRoleDto[];
    homeOffice: OfficeDto;
    reminderSettings: ReminderSettingsDto;
}

export interface RedactedUserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    homeOffice: OfficeDto;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

export interface ModifyUserDto {
    firstName: string;
    lastName: string;
    email: string;
    officeId: number;
    roleIds?: number[];
}
