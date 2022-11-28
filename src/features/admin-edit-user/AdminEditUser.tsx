import { Link, Typography, DialogContentText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import TabPanel from '../../components/tab-panel/TabPanel';
import UserForm from '../../components/user-form/UserForm';
import { ModifyUserDto } from '../../models/user/UserDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import DeleteAccountDialog from '../../components/delete-account-popup/DeleteAccountDialog';
import {
    modifyCurrentUserAsync,
    removeUserAsync,
    selectCurrentUser,
} from '../../store/user/user-slice';
import { isAdmin } from '../../utility/user-helper';
import { showSuccessSnackBar } from '../../store/ui/ui-slice';
import ConfirmationDialog from '../../components/confirmation-popup/ConfirmationDialog';

const AdminEditUser = (): JSX.Element => {
    const { t } = useTranslation();
    const [currentTab] = useState(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(selectCurrentUser);

    const userDetailsOnSubmit: SubmitHandler<ModifyUserDto> = async (data) => {
        if (user) {
            await dispatch(
                modifyCurrentUserAsync({ userId: user.id, data })
            ).unwrap();
            await showSuccessSnackBar(t('user.user_modify_successful'));
        }
    };

    const onDeleteConfirm = async (): Promise<void> => {
        if (user !== undefined) {
            await dispatch(removeUserAsync(user.id)).unwrap();
            navigate('/login');
        }
    };

    const onAdminDeleteConfirm = async (): Promise<void> => {
        /** TODO: Disable user account functionality for admin */
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
                            {t('management.user_management')}
                        </Typography>
                    </Grid2>
                    <TabPanel value={currentTab} index={0}>
                        <Grid2 xs={12}>
                            <UserForm
                                onSubmit={userDetailsOnSubmit}
                                initialValues={user}
                                canModifyRoles={true}
                            />
                        </Grid2>
                        <Grid2 xs={12} className="flex-center">
                            <Link
                                component="button"
                                onClick={() => {
                                    setDeleteOpen(true);
                                }}
                            >
                                {t('user.disable_account')}
                            </Link>
                        </Grid2>
                    </TabPanel>
                </Grid2>
            </MainLayout>
            {!isAdmin(user) && (
                <DeleteAccountDialog
                    title={t('user.disable_account')}
                    onConfirm={onDeleteConfirm}
                    open={isDeleteOpen}
                    onCancel={() => setDeleteOpen(false)}
                >
                    <DialogContentText>
                        {t('dialogs.delete_account')}
                    </DialogContentText>
                </DeleteAccountDialog>
            )}
            <ConfirmationDialog
                title={t('user.disable_account')}
                onConfirm={onAdminDeleteConfirm}
                open={isDeleteOpen}
                onCancel={() => setDeleteOpen(false)}
            >
                <DialogContentText>
                    {t('dialogs.confirmation')}
                </DialogContentText>
            </ConfirmationDialog>
        </>
    );
};

export default AdminEditUser;
