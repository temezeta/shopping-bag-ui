import { Link, Typography, DialogContentText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import UserForm from '../../components/user-form/UserForm';
import { ModifyUserDto } from '../../models/user/UserDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    modifyUserAsync,
    disableAccountAdminAsync,
    selectUserById,
} from '../../store/user/user-slice';
import { showSuccessSnackBar } from '../../store/ui/ui-slice';
import ConfirmationDialog from '../../components/confirmation-popup/ConfirmationDialog';

const AdminEditUser = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { userId } = useParams();
    const navigate = useNavigate();
    const id = Number(userId);

    const user = useAppSelector(selectUserById(id));

    const userDetailsOnSubmit: SubmitHandler<ModifyUserDto> = async (data) => {
        if (user) {
            await dispatch(modifyUserAsync({ userId: user.id, data })).unwrap();
            await showSuccessSnackBar(t('user.user_modify_successful'));
        }
    };

    const onAdminDeleteConfirm = async (): Promise<void> => {
        if (user !== undefined) {
            await dispatch(disableAccountAdminAsync(user.id)).unwrap();
            navigate('/management/users');
        }
    };
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

    return (
        <>
            <MainLayout onBackButton={() => navigate('/management/users')}>
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
                    <Grid2 xs={12}>
                        {user && (
                            <UserForm
                                onSubmit={userDetailsOnSubmit}
                                initialValues={user}
                                canModifyRoles={true}
                            />
                        )}
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
                </Grid2>
            </MainLayout>
            <ConfirmationDialog
                title={t('user.disable_account')}
                onConfirm={onAdminDeleteConfirm}
                open={isDeleteOpen}
                onCancel={() => setDeleteOpen(false)}
            >
                <DialogContentText>
                    {t('dialogs.disable_account_admin')}
                </DialogContentText>
            </ConfirmationDialog>
        </>
    );
};

export default AdminEditUser;
