import { Search as SearchIcon } from '@mui/icons-material';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

const Search = (props: TextFieldProps): JSX.Element => {
    return (
        <TextField
            {...props}
            size="small"
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default Search;
