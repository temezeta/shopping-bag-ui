import { Link, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AddItemForm from '../../components/add-item-layout/AddItemForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddItemDto } from '../../models/lists/AddItemDto';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { addItemAsync } from '../../store/lists/item-slice';

const AddItem = (): JSX.Element => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<AddItemDto> = async (data) => {
        unwrapResult(await dispatch(addItemAsync(data)));
        navigate('/home');
    };
    return (
        <>
            <MainLayout>
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} className="flex-center">
                        <Grid2 xs={2}>
                            <Link href="'/home'">
                                {/* It is not on the left */}
                                <ArrowBackIosIcon></ArrowBackIosIcon>
                            </Link>
                        </Grid2>
                        <Grid2 xs={10}>
                            <Typography
                                variant="h1"
                                display="flex"
                                justifyContent="center"
                            >
                                {t('actions.add_new_item')}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Grid2 xs={12}>
                        <AddItemForm onSubmit={onSubmit} id={Number(id)} />
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};

export default AddItem;
