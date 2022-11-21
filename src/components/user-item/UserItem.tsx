import { Edit } from '@mui/icons-material';
import { IconButton, ListItem, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDto } from '../../models/user/UserDto';

interface UserItemProps {
    user: UserDto;
}

const UserItem = (props: UserItemProps): JSX.Element => {
    const { user } = props;
    const navigate = useNavigate();

    return (
        <ListItem divider={true}>
            <Grid2 container xs={12}>
                <Grid2 xs={6}>
                    <Grid2 container xs={12}>
                        <Grid2 xs={12}>
                            <Typography>{`${user.lastName}, ${user.firstName}`}</Typography>
                        </Grid2>
                        <Grid2 xs={12}>
                            <Typography variant="body2">
                                {user.email}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 xs={5} className="flex-center" flexDirection="column">
                    {user.userRoles.map((it, i) => (
                        <Typography key={i}>{it.roleName}</Typography>
                    ))}
                </Grid2>
                <Grid2 xs={1} className="flex-center">
                    <IconButton
                        onClick={() => navigate(`/user/${user.id}/edit`)}
                    >
                        <Edit />
                    </IconButton>
                </Grid2>
            </Grid2>
        </ListItem>
    );
};

export default UserItem;
