import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SortOptions, SortType } from '../../utility/sort-helper';

interface SortButtonProps {
    sortOptions: SortOptions;
    setSortOptions: (options: SortOptions) => void;
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
                color: 'text.primary',
            }}
            onClick={() =>
                sortOptions.sortType !== columnSortType
                    ? sortOptions.sortType === SortType.Likes
                        ? setSortOptions({
                              sortType: columnSortType,
                              sortDescending: true,
                          })
                        : setSortOptions({
                              sortType: columnSortType,
                              sortDescending: false,
                          })
                    : setSortOptions({
                          sortType: columnSortType,
                          sortDescending: !sortOptions.sortDescending,
                      })
            }
        >
            <Typography variant="body1">{columnName}</Typography>
            <Grid2 container spacing={0} minWidth={29} padding={0}>
                {sortOptions.sortType === columnSortType ? (
                    sortOptions.sortDescending ? (
                        <KeyboardArrowDown />
                    ) : (
                        <KeyboardArrowUp />
                    )
                ) : null}
            </Grid2>
        </Button>
    );
};
export default SortButton;
