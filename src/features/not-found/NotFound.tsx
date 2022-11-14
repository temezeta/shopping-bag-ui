import { useTranslation } from 'react-i18next';
import LoginLayout from '../../components/login-layout/LoginLayout';

const NotFound = (): JSX.Element => {
    const { t } = useTranslation();
    return <LoginLayout>{t('errors.page_not_found')}</LoginLayout>;
};

export default NotFound;
