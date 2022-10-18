import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getAllOfficesAsync,
    selectOffices,
} from '../../store/office/office-slice';
import DropdownMenu from '../dropdown-menu/DropdownMenu';

const OfficeMenu = (): JSX.Element => {
    const offices = useAppSelector(selectOffices);
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getAllOfficesAsync());
    }, []);

    /**
     * TODO
     * Add functionality for selecting "temporary office" which overrides home office for the session
     * Change the title to display the current temporary office and/or home office
     */

    return (
        <DropdownMenu
            title={'Offices'}
            items={offices.map((it) => ({ title: it.name }))}
        />
    );
};

export default OfficeMenu;
