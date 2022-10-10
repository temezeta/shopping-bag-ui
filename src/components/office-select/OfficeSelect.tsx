import { Select, MenuItem, SelectProps } from '@mui/material';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import {
    getAllOfficesAsync,
    selectOffices,
} from '../../store/office/office-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { OfficeDto } from '../../models/office/OfficeDto';

type OfficeSelectProps = SelectProps;

const OfficeSelect = (
    props: OfficeSelectProps,
    ref: ForwardedRef<unknown>
): JSX.Element => {
    const dispatch = useAppDispatch();
    const offices: OfficeDto[] = useAppSelector(selectOffices);
    useEffect(() => {
        void dispatch(getAllOfficesAsync());
    }, []);

    return (
        <Select {...props} ref={ref} size="small">
            {offices.map((it) => (
                <MenuItem value={it.id} key={it.id}>
                    {it.name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default forwardRef(OfficeSelect);
