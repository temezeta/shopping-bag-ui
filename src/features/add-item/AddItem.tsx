import { Link, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AddItemForm from '../../components/add-item-layout/AddItemForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddItemDto } from '../../models/auth/AddItemDto';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { addItemAsync } from '../../store/auth/auth-slice';
import { useAppDispatch } from '../../store/hooks';

const AddItem = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<AddItemDto> = (data) => {
        dispatch(addItemAsync(data))
            .then(unwrapResult)
            .then((result) => {
                if (result) {
                    // setErrOpen(false);
                    navigate('/list');
                }
            })
            .catch(() => {
                // setErrOpen(true);
            });
    };

    return (
        <>
            <MainLayout>
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} className="flex-center">
                        <Link href="/list" align="left">
                            {/* It is not on the left */}
                            <ArrowBackIosIcon></ArrowBackIosIcon>
                        </Link>
                        <Typography
                            variant="h1"
                            display="flex"
                            justifyContent="center"
                        >
                            {t('actions.add_new_item')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <AddItemForm onSubmit={onSubmit} />
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};

export default AddItem;
