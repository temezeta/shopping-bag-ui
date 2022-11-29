import { Home } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { OfficeDto } from '../../models/office/OfficeDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectOffices } from '../../store/office/office-slice';
import {
    selectCurrentOffice,
    selectHomeOffice,
    setSessionOffice,
} from '../../store/user/user-slice';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import styles from './OfficeMenu.module.css';

const OfficeMenu = (): JSX.Element => {
    const offices = useAppSelector(selectOffices);
    const currentOffice = useAppSelector(selectCurrentOffice);
    const homeOffice = useAppSelector(selectHomeOffice);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const homeIcon = <Home style={{ color: '#fff' }} />;

    const getMenuTitle = (): JSX.Element => {
        return (
            <span className="flex-center">
                {homeOffice?.id === currentOffice?.id && <Home />}
                <span className={styles.menuItem}>
                    {currentOffice?.name ?? t('user.office')}
                </span>
            </span>
        );
    };

    const getOfficeItem = (office: OfficeDto): JSX.Element => {
        return (
            <span className="flex-center">
                {homeOffice?.id === office.id && <Home />}
                <span
                    className={
                        currentOffice?.id === office.id
                            ? styles.menuItemActive
                            : styles.menuItem
                    }
                >
                    {office.name}
                </span>
            </span>
        );
    };

    const setOffice = (office: OfficeDto): void => {
        dispatch(setSessionOffice(office));
    };

    return (
        <DropdownMenu
            title={getMenuTitle()}
            items={offices.map((it) => ({
                title: getOfficeItem(it),
                onClick: () => setOffice(it),
            }))}
            icon={homeIcon}
        />
    );
};

export default OfficeMenu;
