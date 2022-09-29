import { Select, MenuItem, SelectProps } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';

type OfficeSelectProps = SelectProps;

const OfficeSelect = (
    props: OfficeSelectProps,
    ref: ForwardedRef<unknown>
): JSX.Element => {
    // TODO Fetch these from backend
    const DUMMY_OFFICES: Array<{ id: number; name: string }> = [
        {
            id: 1,
            name: 'Office 1',
        },
    ];

    return (
        <Select {...props} ref={ref}>
            {DUMMY_OFFICES.map((it) => (
                <MenuItem value={it.id} key={it.id}>
                    {it.name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default forwardRef(OfficeSelect);
