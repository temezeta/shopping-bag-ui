import {
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    SelectProps,
} from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const options = [1, 2, 3];

type ReminderSelectProps = SelectProps<number[]>;

const ReminderSelect = (
    props: ReminderSelectProps,
    ref: ForwardedRef<unknown>
): JSX.Element => {
    const { t } = useTranslation();
    const getDaySuffix = (selections: number[]): string => {
        return selections.length === 1 && selections[0] === 1
            ? ' ' + t('notifications.day')
            : ' ' + t('notifications.days');
    };

    const isSelected = (option: number): boolean => {
        if (!props.value) return false;
        return props.value.includes(option);
    };

    return (
        <Select
            {...props}
            ref={ref}
            multiple
            size="small"
            renderValue={(selected) =>
                selected.sort((a, b) => a - b).join(', ') +
                getDaySuffix(selected)
            }
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    <Checkbox checked={isSelected(option)} />
                    <ListItemText
                        primary={`${option}${getDaySuffix([option])}`}
                    />
                </MenuItem>
            ))}
        </Select>
    );
};

export default forwardRef(ReminderSelect);
