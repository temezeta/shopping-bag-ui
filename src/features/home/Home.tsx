import { Tab, Tabs, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { SyntheticEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/main-layout/MainLayout';
import ShoppingListTab from '../../components/shopping-list-tab/ShoppingListTab';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    selectActiveLists,
    selectActiveShoppingListId,
    setActiveShoppingListId,
} from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentUser } from '../../store/user/user-slice';
import { isAdmin } from '../../utility/user-helper';

const Home = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const activeShoppingLists = useAppSelector(selectActiveLists);
    const activeListId = useAppSelector(selectActiveShoppingListId);
    const selectedListId =
        activeShoppingLists.find((it) => it.id === activeListId)?.id ?? false;

    // Handle admin page transition
    useEffect(() => {
        if (isAdmin(user)) {
            navigate('/orders', { replace: true });
        }
    }, [user]);

    useEffect(() => {
        /**
         * Reset selectedListId only when the active shopping lists office changes
         * to avoid that liking an item resets it.
         */
        if (!activeShoppingLists.find((it) => it.id === selectedListId)) {
            dispatch(
                setActiveShoppingListId(
                    activeShoppingLists.length
                        ? activeShoppingLists[0].id
                        : false
                )
            );
        }
    }, [activeShoppingLists]);

    const handleTabChange = (_: SyntheticEvent, value: number): void => {
        dispatch(setActiveShoppingListId(value));
    };

    return (
        <MainLayout width="65em">
            <Grid2 container spacing={1}>
                <Grid2
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {activeShoppingLists.length > 0 && (
                        <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile={true}
                            color="primary"
                            indicatorColor="primary"
                            value={selectedListId}
                            onChange={handleTabChange}
                        >
                            {activeShoppingLists.map((list, i) => (
                                <Tab
                                    label={list.name}
                                    key={i}
                                    value={list.id}
                                />
                            ))}
                        </Tabs>
                    )}
                </Grid2>

                {selectedListId &&
                    activeShoppingLists.map((list, i) => (
                        <ShoppingListTab
                            value={selectedListId}
                            list={list}
                            key={i}
                        />
                    ))}
                {activeShoppingLists.length === 0 && (
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{
                            marginTop: '15px',
                            width: '100%',
                        }}
                    >
                        {t('list.no_active_lists')}
                        <br></br>
                        <SentimentDissatisfiedIcon
                            color="action"
                            fontSize="large"
                            sx={{
                                marginTop: '15px',
                            }}
                        ></SentimentDissatisfiedIcon>
                    </Typography>
                )}
            </Grid2>
        </MainLayout>
    );
};

export default Home;
