import { Select, MenuItem, SelectProps } from '@mui/material';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { getAllOfficesAsync } from '../../store/office/office-slice';
import { useAppDispatch } from '../../store/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { OfficeDto } from '../../models/office/OfficeDto';

type OfficeSelectProps = SelectProps;

const OfficeSelect = (
    props: OfficeSelectProps,
    ref: ForwardedRef<unknown>
): JSX.Element => {
    const dispatch = useAppDispatch();
    const [offices, setOffices] = useState<OfficeDto[]>([]);
    useEffect(() => {
        dispatch(getAllOfficesAsync(null))
            .then(unwrapResult)
            .then((result) => {
                setOffices(result);
            })
            .catch(() => {
                // Ignore?
            });
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
