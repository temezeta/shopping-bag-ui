import { Select, MenuItem, SelectProps } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import { selectRoles } from '../../store/user/user-slice';
import { useAppSelector } from '../../store/hooks';
import { UserRoleDto } from '../../models/user/UserRoleDto';

type RoleSelectProps = SelectProps;

const RoleSelect = (
    props: RoleSelectProps,
    ref: ForwardedRef<unknown>
): JSX.Element => {
    const roles: UserRoleDto[] = useAppSelector(selectRoles);

    return (
        <Select {...props} ref={ref} size="small" multiple>
            {roles.map((it) => (
                <MenuItem value={it.roleId} key={it.roleId}>
                    {it.roleName}
                </MenuItem>
            ))}
        </Select>
    );
};

export default forwardRef(RoleSelect);
