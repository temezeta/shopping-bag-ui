import { Box, Checkbox, ListItem, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import Grid2 from '@mui/material/Unstable_Grid2';
import styles from './ShoppingListItem.module.css';
import ShoppingListItemActions from '../shopping-list-item-actions/ShoppingListItemActions';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLikeStatusAsync } from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentUser } from '../../store/user/user-slice';
import { hasUserLikedItem } from '../../utility/user-helper';

interface ShoppingListItemProps {
    item: ItemDto;
}

const ShoppingListItem = (props: ShoppingListItemProps): JSX.Element => {
    const { item } = props;
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);

    const handleItemLike = async (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ): Promise<void> => {
        // Disable the button until dispatch resolve to avoid duplicate clicks
        event.target.disabled = true;
        try {
            await dispatch(
                setLikeStatusAsync({ data: checked, itemId: item.id })
            );
        } finally {
            event.target.disabled = false;
        }
    };

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
                        {item.url ? (
                            <a href={item.url}>{item.name}</a>
                        ) : (
                            <div>{item.name}</div>
                        )}
                        <Typography variant="body2" fontWeight="medium">
                            {item.shopName}
                        </Typography>
                        <Box display={{ xs: 'none', sm: 'inline' }}>
                            <Typography variant="body2">
                                {item.comment}
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 xs={2} className={'flex-center'}>
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={hasUserLikedItem(item, user)}
                        color="info"
                        onChange={handleItemLike}
                    ></Checkbox>
                    <Typography variant="body1">
                        {item.usersWhoLiked.length}
                    </Typography>
                </Grid2>
                <Grid2 xs={2} className={'flex-center'}>
                    <ShoppingListItemActions item={item} />
                </Grid2>
                <Box
                    component={Grid2}
                    xs={12}
                    sm={0}
                    display={{ xs: 'inline', sm: 'none' }}
                    className={styles.itemCommentPhone}
                >
                    <Typography variant="body2">{item.comment}</Typography>
                </Box>
            </Grid2>
        </ListItem>
    );
};

export default ShoppingListItem;
