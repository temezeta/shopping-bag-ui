import { ItemDto } from '../models/shopping-list/ItemDto';
import { Role } from '../models/user/RoleEnum';
import { UserDto } from '../models/user/UserDto';

export const isAdmin = (user?: UserDto): boolean => {
    return user?.userRoles.some((it) => it.roleName === Role.Admin) ?? false;
};

export const hasUserLikedItem = (item?: ItemDto, user?: UserDto): boolean => {
    if (!user || !item) return false;
    return !!item.usersWhoLiked.find((it) => it.id === user.id);
};
