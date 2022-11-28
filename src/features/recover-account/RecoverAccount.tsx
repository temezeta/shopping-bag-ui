import { IconButton, Tab, Tabs, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SendEmailForm, {
    EmailInformation,
} from '../../components/send-email-form/SendEmailForm';
import LoginLayout from '../../components/login-layout/LoginLayout';
import TabPanel, { a11yProps } from '../../components/tab-panel/TabPanel';
import RecoverAccountForm from '../../components/recover-account-form/RecoverAccountForm';
import { SubmitHandler } from 'react-hook-form';
import { ResetPasswordDto } from '../../models/auth/ResetPasswordDto';
import { useAppDispatch } from '../../store/hooks';
import {
    recoverAccountAsync,
    resendVerificationEmailAsync,
    resetPasswordAsync,
} from '../../store/auth/auth-slice';
import { showSuccessSnackBar } from '../../store/ui/ui-slice';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RecoverAccount = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [isRecoveryEmailSent, setRecoveryEmailSent] =
        useState<boolean>(false);

    const handleTabChange = (
        _: React.SyntheticEvent,
        newValue: number
    ): void => {
        setCurrentTab(newValue);
        setRecoveryEmailSent(false);
    };

    const onSubmitResetAccount: SubmitHandler<EmailInformation> = async (
        data
    ) => {
        await dispatch(recoverAccountAsync(data.email)).unwrap();
        setRecoveryEmailSent(true);
        await showSuccessSnackBar(t('user.recovery_email_successful'));
    };

    const onSubmitResetPassword: SubmitHandler<ResetPasswordDto> = async (
        data
    ) => {
        await dispatch(resetPasswordAsync(data)).unwrap();
        await showSuccessSnackBar(t('user.password_change_successful'));
        navigate('/login');
    };

    const onSubmitResendVerificationEmail: SubmitHandler<
        EmailInformation
    > = async (data) => {
        await dispatch(resendVerificationEmailAsync(data.email)).unwrap();
        await showSuccessSnackBar(t('user.verification_email_successful'));
        navigate('/login');
    };

    return (
        <LoginLayout>
            <Grid2 container spacing={1}>
                <Grid2 xs={12}>
                    <IconButton onClick={() => navigate('/login')}>
                        <ArrowBackIos />
                    </IconButton>
                </Grid2>
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
                    <Grid2 xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">
                            {!isRecoveryEmailSent
                                ? t('user.recover_account_help')
                                : t('user.recovery_token_help')}
                        </Typography>
                    </Grid2>
                    {!isRecoveryEmailSent && (
                        <Grid2 xs={12}>
                            <SendEmailForm onSubmit={onSubmitResetAccount} />
                        </Grid2>
                    )}
                    {isRecoveryEmailSent && (
                        <Grid2 xs={12}>
                            <RecoverAccountForm
                                onSubmit={onSubmitResetPassword}
                            />
                        </Grid2>
                    )}
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                    <Grid2 xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">
                            {t('user.resend_verification_help')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <SendEmailForm
                            onSubmit={onSubmitResendVerificationEmail}
                        />
                    </Grid2>
                </TabPanel>
            </Grid2>
        </LoginLayout>
    );
};

export default RecoverAccount;
