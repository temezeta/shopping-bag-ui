import { Home } from '@mui/icons-material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { OfficeDto } from '../../models/office/OfficeDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getAllOfficesAsync,
    selectOffices,
} from '../../store/office/office-slice';
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

    useEffect(() => {
        void dispatch(getAllOfficesAsync());
    }, []);

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
            title={currentOffice?.name ?? t('user.office')}
            items={offices.map((it) => ({
                title: getOfficeItem(it),
                onClick: () => setOffice(it),
            }))}
            icon={homeIcon}
        />
    );
};

export default OfficeMenu;
