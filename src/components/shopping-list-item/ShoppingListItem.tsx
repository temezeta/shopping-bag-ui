import { Box, Checkbox, ListItem, TextField, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import Grid2 from '@mui/material/Unstable_Grid2';
import styles from './ShoppingListItem.module.css';
import ShoppingListItemActions from '../shopping-list-item-actions/ShoppingListItemActions';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    setLikeStatusAsync,
    setOrderedAmountAsync,
} from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentUser } from '../../store/user/user-slice';
import { hasUserLikedItem, isAdmin } from '../../utility/user-helper';

interface ShoppingListItemProps {
    item: ItemDto;
}

const ShoppingListItem = (props: ShoppingListItemProps): JSX.Element => {
    const { item } = props;
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const quantity = item.usersWhoLiked.length;

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
    const handleAsync = async (
        event: ChangeEvent<HTMLInputElement>,
        quantity: number
    ): Promise<void> => {
        // Disable the button until dispatch resolve to avoid duplicate clicks
        event.target.disabled = true;
        try {
            await dispatch(
                setOrderedAmountAsync({
                    amountOrdered: quantity,
                    itemId: item.id,
                })
            );
            // change cuantity
            // TODO waiting for backend.
        } finally {
            event.target.disabled = false;
        }
    };
    const handleChange =
        (quantity: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            void handleAsync(event, quantity);
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
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.name ? item.name : item.url}
                            </a>
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
                    {!isAdmin(user) && (
                        <Typography variant="body1">
                            {item.usersWhoLiked.length}
                        </Typography>
                    )}
                    {isAdmin(user) && (
                        <TextField
                            id="outlined-number"
                            type="number"
                            defaultValue={quantity}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange(quantity)} // onChange={handleChange('weight')}
                        />
                    )}
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
