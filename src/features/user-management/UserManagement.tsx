import { List } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MainLayout from '../../components/main-layout/MainLayout';
import UserItem from '../../components/user-item/UserItem';
import { UserDto } from '../../models/user/UserDto';

const TEST_USERS: UserDto[] = [
    {
        id: 1,
        firstName: 'Admin',
        lastName: 'User',
        email: 'test1@ethereal.email',
        userRoles: [
            {
                roleId: 1,
                roleName: 'Admin',
            },
        ],
        homeOffice: {
            id: 1,
            name: 'Espoo',
        },
    },
    {
        id: 2,
        firstName: 'Test',
        lastName: 'User',
        email: 'test2@ethereal.email',
        userRoles: [
            {
                roleId: 1,
                roleName: 'Admin',
            },
            {
                roleId: 2,
                roleName: 'User',
            },
        ],
        homeOffice: {
            id: 1,
            name: 'Espoo',
        },
    },
    {
        id: 3,
        firstName: 'Matti',
        lastName: 'Myöhäinen',
        email: 'test3@ethereal.email',
        userRoles: [
            {
                roleId: 2,
                roleName: 'User',
            },
        ],
        homeOffice: {
            id: 1,
            name: 'Espoo',
        },
    },
];

const UserManagement = (): JSX.Element => {
    return (
        <MainLayout>
            <Grid2 container xs={12}>
                <Grid2 xs={12}>
                    <List className="full-width">
                        {TEST_USERS.map((user, i) => (
                            <UserItem user={user} key={i} />
                        ))}
                    </List>
                </Grid2>
            </Grid2>
        </MainLayout>
    );
};

export default UserManagement;
