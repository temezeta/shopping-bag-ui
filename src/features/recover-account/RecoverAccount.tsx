import { Tab, Tabs, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SendEmailForm from '../../components/send-email-form/SendEmailForm';
import LoginLayout from '../../components/login-layout/LoginLayout';
import TabPanel, { a11yProps } from '../../components/tab-panel/TabPanel';
import RecoverAccountForm from '../../components/recover-account-form/RecoverAccountForm';

const RecoverAccount = (): JSX.Element => {
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState<number>(0);

    const handleTabChange = (
        event: React.SyntheticEvent,
        newValue: number
    ): void => {
        setCurrentTab(newValue);
    };

    return (
        <LoginLayout>
            <Grid2 container spacing={1}>
                <Grid2 xs={12} className="flex-center">
                    <Typography variant="h1">
                        {t('user.account_recovery')}
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
                        <Tab
                            label={t('user.account_recovery')}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label={t('user.resend_verification')}
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Grid2>
                <TabPanel value={currentTab} index={0}>
                    <Grid2 xs={12}>
                        <SendEmailForm />
                    </Grid2>
                    <Grid2 xs={12}>
                        <RecoverAccountForm />
                    </Grid2>
                </TabPanel>
                <TabPanel value={currentTab} index={1}></TabPanel>
            </Grid2>
        </LoginLayout>
    );
};

export default RecoverAccount;
