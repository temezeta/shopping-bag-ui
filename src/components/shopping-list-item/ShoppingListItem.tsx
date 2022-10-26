import {
    Box,
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    Tooltip,
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
import { removeShoppingListItemAsync } from '../../store/shopping-list-item/shopping-list-item-slice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';

interface ShoppingListItemProps {
    item: ItemDto;
}

const ShoppingListItem = (props: ShoppingListItemProps): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const removeShoppingListItem = async (id: number): Promise<void> => {
        await dispatch(removeShoppingListItemAsync(id));
    };

    return (
        <ListItem divider={true}>
            <Grid2
                container
                spacing={2}
                className={'full-width'}
                alignItems="center"
            >
                <Box
                    component={Grid2}
                    sm={1}
                    display={{ xs: 'none', md: 'inline' }}
                >
                    {/** TODO: copy functionality */}
                    <ListItemIcon>
                        <IconButton edge="start" aria-label="copy item">
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </ListItemIcon>
                </Box>
                <Grid2 xs={8} sm={7}>
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
                    <Typography variant="body1">1</Typography>
                </Grid2>
                <Grid2 xs={2} className={'flex-center'}>
                    <Box display={{ xs: 'none', sm: 'flex' }}>
                        <Tooltip title={t('list.delete-item')} enterDelay={800}>
                            <IconButton
                                aria-label="delete"
                                onClick={async () =>
                                    await removeShoppingListItem(props.item.id)
                                }
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('list.edit-item')} enterDelay={800}>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() =>
                                    navigate('/edit-item', {
                                        state: { id: props.item.id },
                                    })
                                }
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box display={{ xs: 'inline', sm: 'none' }}>
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
