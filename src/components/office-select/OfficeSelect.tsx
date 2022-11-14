import { Select, MenuItem, SelectProps } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import { selectOffices } from '../../store/office/office-slice';
import { useAppSelector } from '../../store/hooks';
import { OfficeDto } from '../../models/office/OfficeDto';

type OfficeSelectProps = SelectProps;

const OfficeSelect = (
    props: OfficeSelectProps,
    ref: ForwardedRef<unknown>
): JSX.Element => {
    const offices: OfficeDto[] = useAppSelector(selectOffices);

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
