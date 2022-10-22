import {
    Box,
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    Typography,
} from '@mui/material';
import {
    ContentCopy,
    Delete,
    Edit,
    Favorite,
    FavoriteBorder,
    MoreHoriz,
} from '@mui/icons-material';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import Grid2 from '@mui/material/Unstable_Grid2';
import styles from './ShoppingListItem.module.css';

interface ShoppingListItemProps {
    item: ItemDto;
}

const ShoppingListItem = (props: ShoppingListItemProps): JSX.Element => {
    return (
        <ListItem divider={true}>
            <Grid2
                container
                spacing={2}
                className={styles.listContainer}
                alignItems="center"
            >
                <Grid2 xs={8} sm={7}>
                    <Box display="flex">
                        <Box display={{ xs: 'none', md: 'inline' }}>
                            {/** TODO: copy functionality */}
                            <ListItemIcon>
                                <IconButton edge="start" aria-label="copy item">
                                    <ContentCopy fontSize="small" />
                                </IconButton>
                            </ListItemIcon>
                        </Box>
                        <Box>
                            <a href={props.item.url}>{props.item.name}</a>
                            <Box display={{ xs: 'none', sm: 'inline' }}>
                                <Typography variant="body2">
                                    {props.item.comment}
                                </Typography>
                            </Box>
                            <Box display={{ xs: 'inline', sm: 'none' }}>
                                <Typography variant="body2">
                                    {props.item.shopName}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 xs={2} sm={1} className={styles.centerContent}>
                    {/** TODO: like functionality */}
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                    ></Checkbox>
                    <Typography variant="body1">1</Typography>
                </Grid2>
                <Box
                    component={Grid2}
                    xs={3}
                    display={{ xs: 'none', sm: 'grid' }}
                >
                    <Box className={styles.centerContent}>
                        <Typography variant="body1">
                            {props.item.shopName}
                        </Typography>
                    </Box>
                </Box>
                <Grid2 xs={2} sm={1} className={styles.centerContent}>
                    <Box display={{ xs: 'none', md: 'flex' }}>
                        <IconButton aria-label="delete">
                            <Delete />
                        </IconButton>
                        <IconButton edge="end" aria-label="edit">
                            <Edit />
                        </IconButton>
                    </Box>
                    <Box display={{ xs: 'inline', md: 'none' }}>
                        <IconButton aria-label="actions">
                            {/** TODO: implement phoneview action buttons */}
                            <MoreHoriz />
                        </IconButton>
                    </Box>
                </Grid2>
                <Box
                    component={Grid2}
                    xs={12}
                    sm={0}
                    display={{ xs: 'inline', sm: 'none' }}
                    className={styles.itemCommentPhone}
                >
                    <Typography variant="body2">
                        {props.item.comment}
                    </Typography>
                </Box>
            </Grid2>
        </ListItem>
    );
};

export default ShoppingListItem;
