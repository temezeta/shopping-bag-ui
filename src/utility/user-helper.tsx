import { Role } from '../models/user/RoleEnum';
import { UserDto } from '../models/user/UserDto';

export const isAdmin = (user?: UserDto): boolean => {
    return user?.userRoles.some((it) => it.roleName === Role.Admin) ?? false;
};
