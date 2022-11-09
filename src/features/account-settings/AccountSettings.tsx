import { Link, Tab, Tabs, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import TabPanel, { a11yProps } from '../../components/tab-panel/TabPanel';
import UserForm from '../../components/user-form/UserForm';
import { UserDto } from '../../models/user/UserDto';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user-slice';

const AccountSettings = (): JSX.Element => {
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (
        event: React.SyntheticEvent,
        newValue: number
    ): void => {
        setCurrentTab(newValue);
    };

    const user = useAppSelector(selectCurrentUser);

    const onSubmit: SubmitHandler<UserDto> = async (data) => {};

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
                                onSubmit={onSubmit}
                                initialValues={user}
                            />
                        </Grid2>
                        <Grid2 xs={12} className="flex-center">
                            <Link component="button" onClick={() => {}}>
                                {t('user.delete_account')}
                            </Link>
                        </Grid2>
                    </TabPanel>
                    <TabPanel value={currentTab} index={1}>
                        {/* TODO: Add Password form */}
                    </TabPanel>
                </Grid2>
            </MainLayout>
            {/* TODO: Add delete confirmation dialogue */}
        </>
    );
};

export default AccountSettings;
