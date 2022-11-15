import { Link, Tab, Tabs, Typography, DialogContentText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import PasswordForm from '../../components/password-form/PasswordForm';
import TabPanel, { a11yProps } from '../../components/tab-panel/TabPanel';
import UserForm from '../../components/user-form/UserForm';
import { UserDto, UserPasswordDto } from '../../models/user/UserDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import DeleteAccountDialog from '../../components/delete-account-popup/DeleteAccountDialog';
import {
    changePasswordAsync,
    selectCurrentUser,
} from '../../store/user/user-slice';
import { unwrapResult } from '@reduxjs/toolkit';

interface PasswordFormProps {
    onSubmit?: SubmitHandler<UserPasswordDto>;
}

const AccountSettings = (props: PasswordFormProps): JSX.Element => {
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState(0);
    const dispatch = useAppDispatch();

    const handleTabChange = (
        event: React.SyntheticEvent,
        newValue: number
    ): void => {
        setCurrentTab(newValue);
    };

    const user = useAppSelector(selectCurrentUser);

    const userDetailsOnSubmit: SubmitHandler<UserDto> = async (data) => {};

    const passwordOnSubmit: SubmitHandler<UserPasswordDto> = async (data) => {
        console.log('passwordOnSubmit');
        unwrapResult(await dispatch(changePasswordAsync(data)));
    };

    const onDeleteConfirm = async (): Promise<void> => {
        /* TODO: Add delete account functionality */
    };
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

    return (
        <>
            <MainLayout>
                <Grid2 container spacing={2} sx={{ width: '35rem' }}>
                    <Grid2 xs={12} className="flex-center">
                        <Typography
                            variant="h1"
                            display="flex"
                            justifyContent="center"
                        >
                            {currentTab === 0
                                ? t('user.account_settings')
                                : t('user.password')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12} className="flex-center">
                        <Tabs
                            TabIndicatorProps={{
                                style: { background: 'transparent' },
                            }}
                            variant="scrollable"
                            scrollButtons="auto"
                            value={currentTab}
                            onChange={handleTabChange}
                        >
                            <Tab label={t('user.profile')} {...a11yProps(0)} />
                            <Tab label={t('user.password')} {...a11yProps(1)} />
                        </Tabs>
                    </Grid2>
                    <TabPanel value={currentTab} index={0}>
                        <Grid2 xs={12}>
                            <UserForm
                                onSubmit={userDetailsOnSubmit}
                                initialValues={user}
                            />
                        </Grid2>
                        <Grid2 xs={12} className="flex-center">
                            <Link
                                component="button"
                                onClick={() => {
                                    setDeleteOpen(true);
                                }}
                            >
                                {t('user.delete_account')}
                            </Link>
                        </Grid2>
                    </TabPanel>
                    <TabPanel value={currentTab} index={1}>
                        <Grid2 xs={12}>
                            <PasswordForm onSubmit={passwordOnSubmit} />
                        </Grid2>
                    </TabPanel>
                </Grid2>
            </MainLayout>
            <DeleteAccountDialog
                title={t('user.delete_account')}
                onConfirm={onDeleteConfirm}
                open={isDeleteOpen}
                onCancel={() => setDeleteOpen(false)}
            >
                <DialogContentText>
                    {t('dialogs.delete_account')}
                </DialogContentText>
            </DeleteAccountDialog>
        </>
    );
};

export default AccountSettings;
