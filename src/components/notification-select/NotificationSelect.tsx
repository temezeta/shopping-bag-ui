import {
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    FormControl,
    SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const options = [1, 2, 3];

interface NotificationControlProps {
    selections: number[] | undefined;
}

const NotificationSelect = (props: NotificationControlProps): JSX.Element => {
    const { t } = useTranslation();
    useEffect(() => {
        setSelection(props.selections ? props.selections : []);
    }, []);

    const getDaySuffix = (selections: number[]): string => {
        return selections.length === 1 && selections[0] === 1
            ? ' ' + t('notifications.day')
            : ' ' + t('notifications.days');
    };

    const [selection, setSelection] = useState<number[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selection>): void => {
        const {
            target: { value },
        } = event;
        setSelection(
            typeof value === 'string' ? [] : value.sort((a, b) => a - b)
        );
    };
    return (
        <FormControl fullWidth>
            <Select
                multiple
                value={selection}
                label="Select"
                size="small"
                onChange={handleChange}
                renderValue={(selected) =>
                    selected.join(', ') + getDaySuffix(selected)
                }
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <Checkbox checked={selection.includes(option)} />
                        <ListItemText
                            primary={`${option}${getDaySuffix([option])}`}
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default NotificationSelect;
