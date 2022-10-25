import { Link, Switch, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AddItemForm from '../../components/add-item-layout/AddItemForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddItemDto } from '../../models/lists/AddItemDto';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { unwrapResult } from '@reduxjs/toolkit';
import { Route, useNavigate, useParams } from 'react-router-dom';
import { addItemAsync } from '../../store/auth/auth-slice';
import { useAppDispatch } from '../../store/hooks';

const AddItem = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<AddItemDto> = async (data) => {
        unwrapResult(await dispatch(addItemAsync(data)));
        navigate('/list/:id');
    };
    return (
        <>
            <MainLayout>
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} className="flex-center">
                        <Link href="'/list/:id'">
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
                <Switch>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <Route path="/:id" children={<Child />} />
                </Switch>
            </MainLayout>
        </>
    );
    // not used and cant use tghe methot for the router?
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function Child() {
        let { id } = useParams();
        return (
            <div>
                <h3>ID: {id}</h3>
            </div>
        );
    }
};


export default AddItem;
