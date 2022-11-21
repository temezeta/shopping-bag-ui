import { Box, List, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import UserItem from '../../components/user-item/UserItem';
import { UserDto } from '../../models/user/UserDto';
import { sortByUserRoleAndName } from '../../utility/sort-helper';
import styles from './UserManagement.module.css';

// TODO: Replace with actual users when endpoint available
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
    const { t } = useTranslation();
    const [sortedUsers] = useState<UserDto[]>(
        sortByUserRoleAndName(TEST_USERS)
    );

    return (
        <MainLayout>
            <Grid2 container xs={12}>
                <Grid2 xs={12}>
                    <Box className={styles.userManagementHeader}>
                        <Grid2 container>
                            <Grid2 xs={6}></Grid2>
                            <Grid2 xs={5} className="flex-center">
                                <Typography>{t('user.roles')}</Typography>
                            </Grid2>
                        </Grid2>
                    </Box>
                    <List className="full-width">
                        {sortedUsers.map((user, i) => (
                            <UserItem user={user} key={i} />
                        ))}
                    </List>
                </Grid2>
            </Grid2>
        </MainLayout>
    );
};

export default UserManagement;
