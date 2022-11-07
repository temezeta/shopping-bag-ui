import {
    KeyboardArrowDown,
    KeyboardArrowRight,
    KeyboardArrowUp,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface SortButtonProps {
    sortOptions: { sortType: String; sortDescending: boolean };
    setSortOptions: Function;
    columnSortType: String;
}

const SortButton = (props: SortButtonProps): JSX.Element => {
    const { sortOptions, setSortOptions, columnSortType } = props;
    return (
        <IconButton
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
            {sortOptions.sortType === columnSortType ? (
                sortOptions.sortDescending ? (
                    <KeyboardArrowDown />
                ) : (
                    <KeyboardArrowUp />
                )
            ) : (
                <KeyboardArrowRight />
            )}
        </IconButton>
    );
};
export default SortButton;
