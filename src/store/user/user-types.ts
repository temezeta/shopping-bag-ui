import { OfficeDto } from '../../models/office/OfficeDto';
import { UserDto } from '../../models/user/UserDto';

export interface UserState {
    currentUser?: UserDto;
    sessionOffice?: OfficeDto;
}
