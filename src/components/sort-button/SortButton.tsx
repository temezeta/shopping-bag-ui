import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import theme from '../../theme';
import { SortType } from '../../utility/sort-helper';

interface SortButtonProps {
    sortOptions: { sortType: SortType; sortDescending: boolean };
    setSortOptions: Function;
    columnSortType: SortType;
    columnName: String;
}

const SortButton = (props: SortButtonProps): JSX.Element => {
    const { sortOptions, setSortOptions, columnSortType, columnName } = props;
    return (
        <Button
            sx={{
                textTransform: 'none',
                opacity: 1,
                fontWeight: 'bold',
                color: theme.palette.text.primary,
            }}
            onClick={() =>
                sortOptions.sortType !== columnSortType
                    ? setSortOptions({
                          sortType: columnSortType,
                          sortDescending: true,
                      })
                    : setSortOptions({
                          sortType: columnSortType,
                          sortDescending: !sortOptions.sortDescending,
                      })
            }
        >
            <Typography variant="body1">{columnName}</Typography>
            {sortOptions.sortType === columnSortType ? (
                sortOptions.sortDescending ? (
                    <KeyboardArrowDown />
                ) : (
                    <KeyboardArrowUp />
                )
            ) : null}
        </Button>
    );
};
export default SortButton;
