import { Box, Checkbox, ListItem, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import Grid2 from '@mui/material/Unstable_Grid2';
import styles from './ShoppingListItem.module.css';
import ShoppingListItemActions from '../shopping-list-item-actions/ShoppingListItemActions';

interface ShoppingListItemProps {
    item: ItemDto;
}

const ShoppingListItem = (props: ShoppingListItemProps): JSX.Element => {
    const { item } = props;

    return (
        <ListItem divider={true}>
            <Grid2
                container
                spacing={2}
                className={'full-width'}
                alignItems="center"
            >
                <Grid2 xs={8}>
                    <Box>
                        <a href={props.item.url}>{props.item.name}</a>
                        <Typography variant="body2" fontWeight="medium">
                            {props.item.shopName}
                        </Typography>
                        <Box display={{ xs: 'none', sm: 'inline' }}>
                            <Typography variant="body2">
                                {props.item.comment}
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 xs={2} className={'flex-center'}>
                    {/** TODO: like functionality */}
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                    ></Checkbox>
                    <Typography variant="body1">
                        {item.usersWhoLiked.length}
                    </Typography>
                </Grid2>
                <Grid2 xs={2} className={'flex-center'}>
                    <ShoppingListItemActions item={props.item} />
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
