import { Box, List, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import OfficeSelect from '../../components/office-select/OfficeSelect';
import Search from '../../components/search/Search';
import UserItem from '../../components/user-item/UserItem';
import { UserDto } from '../../models/user/UserDto';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentOffice } from '../../store/user/user-slice';
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
    const currentOffice = useAppSelector(selectCurrentOffice);
    const users = TEST_USERS; // TODO replace with app selector when users available
    const [selectedOffice, setSelectedOffice] = useState<number | undefined>(
        currentOffice?.id
    );
    const [searchString, setSearchString] = useState<string>('');
    const [sortedUsers, setSortedUsers] = useState<UserDto[]>([]);

    // Do user filtering
    useEffect(() => {
        let filteredUsers = [...users];
        if (selectedOffice) {
            filteredUsers = filteredUsers.filter(
                (it) => it.homeOffice.id === selectedOffice
            );
        }

        if (searchString) {
            const lowerCaseSearch = searchString.toLowerCase();
            filteredUsers = filteredUsers.filter(
                (it) =>
                    it.lastName.toLowerCase().startsWith(lowerCaseSearch) ||
                    it.firstName.toLowerCase().startsWith(lowerCaseSearch)
            );
        }

        setSortedUsers(sortByUserRoleAndName(filteredUsers));
    }, [searchString, selectedOffice, users]);

    return (
        <MainLayout>
            <Grid2 container xs={12}>
                <Grid2 xs={12} md={6} className={styles.searchFilter}>
                    <Search
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        fullWidth
                    />
                </Grid2>
                <Grid2 xs={12} md={6} className={styles.searchFilter}>
                    <OfficeSelect
                        value={selectedOffice}
                        onChange={(e) =>
                            setSelectedOffice(e.target.value as number)
                        }
                        fullWidth
                    />
                </Grid2>
                <Grid2 xs={6}></Grid2>
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
