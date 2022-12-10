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
import styles from './ShoppingListItem.module.css';

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

    function getListClassNames(itemClass?: string): string {
        const classNames: string[] = [];
        classNames.push(styles.listGrid);
        itemClass && classNames.push(itemClass);
        pastOrder && classNames.push(styles.pastOrder);
        isAdmin(user) && classNames.push(styles.adminView);
        return classNames.join(' ');
    }

    const hideActions = !isAdmin(user) && (pastOrder || isPastDueDate);

    return (
        <ListItem divider={true}>
            <Box className={getListClassNames(styles.listItem)}>
                <Box className={styles.itemName}>
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
                </Box>
                <Box className={styles.itemShop}>
                    <Typography variant="body2" fontWeight="medium">
                        {item.shopName}
                    </Typography>
                </Box>
                <Box className={`flex-center ${styles.itemLikes}`}>
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
                </Box>
                {isAdmin(user) && (
                    <Box className={`flex-center ${styles.itemQuantity}`}>
                        <TextField
                            id="outlined-number"
                            style={{ width: 75 }}
                            type="number"
                            value={amount}
                            size="small"
                            inputProps={{
                                min: 0,
                                style: { textAlign: 'center' },
                            }}
                            onChange={handleInputChange}
                            onBlur={handleQuantityChange}
                        />
                    </Box>
                )}
                {!isAdmin(user) && pastOrder && (
                    <Box className={`flex-center ${styles.itemQuantity}`}>
                        <Typography
                            variant="body1"
                            color={
                                item.amountOrdered === 0
                                    ? 'error.main'
                                    : 'inherit'
                            }
                        >
                            {item.amountOrdered}
                        </Typography>
                    </Box>
                )}
                {isAdmin(user) && !pastOrder && (
                    <Box className={`flex-center ${styles.itemCheck}`}>
                        <Checkbox
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                            checked={item.isChecked}
                            color="info"
                            onChange={handleItemCheck}
                        ></Checkbox>
                    </Box>
                )}
                {!hideActions && (
                    <Box className={`flex-center ${styles.itemActions}`}>
                        <ShoppingListItemActions item={item} />
                    </Box>
                )}
                {item.comment && (
                    <Box className={styles.itemComment}>
                        <Typography variant="body2">{item.comment}</Typography>
                    </Box>
                )}
            </Box>
        </ListItem>
    );
};

export default ShoppingListItem;
