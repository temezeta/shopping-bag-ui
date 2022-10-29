import { UserDto } from '../../models/user/UserDto';

export interface UserState {
    currentUser?: UserDto;
}
