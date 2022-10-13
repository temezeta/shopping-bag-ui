import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AddItemForm from '../../components/add-item-layout/AddItemForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddItemDto } from '../../models/auth/AddItemDto';
const AddItem = (): JSX.Element => {
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<AddItemDto> = (data) => {};

    return (
        <>
            <MainLayout>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} className="flex-center">
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
