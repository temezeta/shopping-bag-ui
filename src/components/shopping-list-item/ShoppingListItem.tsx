import {
    Box,
    Checkbox,
    ListItem,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import Grid2 from '@mui/material/Unstable_Grid2';
import ShoppingListItemActions from '../shopping-list-item-actions/ShoppingListItemActions';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    setCheckStatusAsync,
    setLikeStatusAsync,
    setOrderedAmountAsync,
} from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentUser } from '../../store/user/user-slice';
import { hasUserLikedItem, isAdmin } from '../../utility/user-helper';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';

interface ShoppingListItemProps {
    item: ItemDto;
    pastOrder: boolean;
    isPastDueDate: boolean;
}

const ShoppingListItem = (props: ShoppingListItemProps): JSX.Element => {
    const { item, pastOrder, isPastDueDate } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const [amount, setAmount] = useState<string | number>(item.amountOrdered);

    const handleItemLike = async (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ): Promise<void> => {
        // Disable the button until dispatch resolve to avoid duplicate clicks
        event.target.disabled = true;
        try {
            await dispatch(
                setLikeStatusAsync({ data: checked, itemId: item.id })
            ).unwrap();
        } finally {
            event.target.disabled = false;
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        if (e.target.value === '') {
            setAmount('');
        } else {
            setAmount(Number(e.target.value));
        }
    };

    const handleQuantityChange = async (event: any): Promise<void> => {
        const value = Number(event.target.value);
        if (value >= 0) {
            try {
                await dispatch(
                    setOrderedAmountAsync({
                        data: {
                            itemId: item.id,
                            amountOrdered: Math.round(value),
                        },
                        listId: item.shoppingListId,
                    })
                ).unwrap();
            } catch {}
        } else {
            setAmount(0);
        }
    };

    const handleItemCheck = async (
        event: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ): Promise<void> => {
        // Disable the button until dispatch resolve to avoid duplicate clicks
        event.target.disabled = true;
        try {
            await dispatch(
                setCheckStatusAsync({
                    data: {
                        itemId: item.id,
                        isChecked: checked,
                    },
                    listId: item.shoppingListId,
                })
            ).unwrap();
        } finally {
            event.target.disabled = false;
        }
    };

    useEffect(() => {
        setAmount(item.amountOrdered);
    }, [item]);

    const getLikeAmount = (): JSX.Element => {
        return isAdmin(user) ? (
            <Tooltip
                title={`${t('item.item_creator')}: ${
                    item.itemAdder.firstName
                } ${item.itemAdder.lastName}`}
            >
                <Typography variant="body1">
                    {item.usersWhoLiked.length}
                </Typography>
            </Tooltip>
        ) : (
            <Typography variant="body1">{item.usersWhoLiked.length}</Typography>
        );
    };

    return (
        <ListItem divider={true}>
            <Grid2
                container
                spacing={2}
                className={'full-width'}
                alignItems="center"
            >
                {/** First row */}
                <Grid2 xs={6} md={2}>
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
                        <Typography
                            variant="body2"
                            fontWeight="medium"
                            display={{ xs: 'block', md: 'none' }}
                        >
                            {item.shopName}
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2
                    xs={0}
                    md={2}
                    className="flex-center"
                    display={{ xs: 'none', md: 'flex' }}
                >
                    <Typography variant="body2" fontWeight="medium">
                        {item.shopName}
                    </Typography>
                </Grid2>
                <Grid2 xs={3} md={2} className="flex-center">
                    {!pastOrder && (
                        <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                            checked={hasUserLikedItem(item, user)}
                            color="info"
                            onChange={handleItemLike}
                        ></Checkbox>
                    )}
                    {getLikeAmount()}
                </Grid2>
                <Grid2 xs={3} md={2} className="flex-center">
                    {isAdmin(user) && (
                        <TextField
                            id="outlined-number"
                            type="number"
                            value={amount}
                            onChange={handleInputChange}
                            onBlur={handleQuantityChange}
                        />
                    )}
                    {!isAdmin(user) && pastOrder && (
                        <Typography variant="body1">
                            {item.amountOrdered}
                        </Typography>
                    )}
                </Grid2>
                <Grid2
                    xs={0}
                    md={2}
                    display={{ xs: 'none', md: 'flex' }}
                    justifyContent="flex-start"
                >
                    {isAdmin(user) && !pastOrder && (
                        <Checkbox
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                            checked={item.isChecked}
                            color="info"
                            onChange={handleItemCheck}
                        ></Checkbox>
                    )}
                </Grid2>
                <Grid2
                    xs={0}
                    md={2}
                    display={{ xs: 'none', md: 'flex' }}
                    className={'flex-center'}
                >
                    <ShoppingListItemActions
                        item={item}
                        hidden={!isAdmin(user) && (pastOrder || isPastDueDate)}
                    />
                </Grid2>
                {/** Second row */}
                <Grid2 xs={12}>
                    <Typography variant="body2">{item.comment}</Typography>
                </Grid2>
                {/** Third row */}
                <Grid2 xs></Grid2>
                <Grid2
                    xs={2}
                    display={{ xs: 'flex', md: 'none' }}
                    className="flex-center"
                >
                    {isAdmin(user) && !pastOrder && (
                        <Checkbox
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                            checked={item.isChecked}
                            color="info"
                            onChange={handleItemCheck}
                        ></Checkbox>
                    )}
                </Grid2>
                <Grid2
                    xs={2}
                    display={{ xs: 'flex', md: 'none' }}
                    className="flex-center"
                >
                    <ShoppingListItemActions item={item} />
                </Grid2>
            </Grid2>
        </ListItem>
    );
};

export default ShoppingListItem;
