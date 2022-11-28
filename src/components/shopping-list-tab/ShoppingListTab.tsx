import {
    Add,
    Link,
    NotificationsActive,
    NotificationsNone,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    List,
    Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'react-i18next';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import styles from './ShoppingListTab.module.css';
import { formatDate } from '../../utility/date-helper';
import ShoppingListItem from '../shopping-list-item/ShoppingListItem';
import { useNavigate } from 'react-router-dom';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import { useEffect, useState } from 'react';
import { showSuccessSnackBar } from '../../store/ui/ui-slice';
import SortButton from '../sort-button/SortButton';
import {
    sortByItemName,
    sortByItemLikes,
    SortType,
    SortOptions,
} from '../../utility/sort-helper';
import Markdown from '../markdown/Markdown';
import moment from 'moment';

interface ShoppingListTabProps {
    list: ShoppingListDto;
    value: number;
}

const ShoppingListTab = (props: ShoppingListTabProps): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { value, list } = props;
    const [sortOptions, setSortOptions] = useState<SortOptions>({
        sortType: SortType.Name,
        sortDescending: true,
    });
    const [sortedItems, setSortedItems] = useState<ItemDto[]>(
        sortByItemLikes(list.items, sortOptions.sortDescending)
    );
    const copyShoppingListLink = async (): Promise<void> => {
        const host = window.location.host;
        const protocol = location.protocol;
        await navigator.clipboard.writeText(
            `${protocol}//${host}/order/${list.id}`
        );
        await showSuccessSnackBar(t('list.list-copy-successful'));
    };

    useEffect(() => {
        switch (sortOptions.sortType) {
            case SortType.Name:
                setSortedItems(
                    sortByItemName(list.items, sortOptions.sortDescending)
                );
                break;
            case SortType.Likes:
                setSortedItems(
                    sortByItemLikes(list.items, sortOptions.sortDescending)
                );
                break;
            default:
                setSortedItems(list.items);
                break;
        }
    }, [sortOptions, list]);

    const isDueDatePassed = moment(list.dueDate, true).isBefore(Date.now());

    return (
        <div
            role="tabpanel"
            hidden={value !== list.id}
            id={`shopping-list-tabpanel-${list.id}`}
            className={styles.tabRoot}
        >
            {value === list.id && (
                <div>
                    <Grid2 container spacing={2} className="flex-center">
                        <Grid2 xs={12} className="flex-center">
                            <IconButton
                                className={styles.copyButton}
                                onClick={copyShoppingListLink}
                            >
                                <Link />
                            </IconButton>
                            <Typography variant="h1">{list.name}</Typography>
                        </Grid2>
                        <Grid2 xs={12} className="flex-center">
                            <Typography variant="h2">
                                {list.listDeliveryOffice.name}
                            </Typography>
                        </Grid2>
                        <Grid2 xs={12}>
                            <Markdown>{list.comment}</Markdown>
                        </Grid2>
                        <Grid2
                            md={4}
                            xs={12}
                            order={{ xs: 4, md: 1 }}
                            className="flex-center"
                        >
                            <Button
                                startIcon={<Add />}
                                variant="contained"
                                onClick={() =>
                                    navigate(`/order/${list.id}/add-item`)
                                }
                                disabled={isDueDatePassed || list.ordered}
                                fullWidth
                            >
                                {t('actions.add_new_item')}
                            </Button>
                        </Grid2>
                        <Grid2 md={6} xs={10} order={{ xs: 1, md: 2 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color:
                                        isDueDatePassed && !list.ordered
                                            ? 'error.main'
                                            : 'inherit',
                                }}
                            >
                                {t('list.due_date') + ': '}
                                {formatDate(list.dueDate, 'DD.MM.YYYY HH:mm')}
                            </Typography>
                            <Typography variant="body2">
                                {t('list.expected_delivery_date') + ': '}
                                {formatDate(list.expectedDeliveryDate)}
                            </Typography>
                        </Grid2>
                        <Grid2
                            md={1}
                            xs={2}
                            order={{ xs: 3, md: 4 }}
                            className="flex-center"
                        >
                            {/** TODO: Notification functionality */}
                            {moment(list.expectedDeliveryDate) > moment() && (
                                <Checkbox
                                    icon={<NotificationsNone />}
                                    checkedIcon={<NotificationsActive />}
                                ></Checkbox>
                            )}
                        </Grid2>
                    </Grid2>
                    <Box className={styles.shoppingListHeader}>
                        <Grid2 container spacing={2} alignItems="center">
                            <Grid2 xs={8}>
                                <SortButton
                                    sortOptions={sortOptions}
                                    setSortOptions={setSortOptions}
                                    columnSortType={SortType.Name}
                                    columnName={t('list.item')}
                                ></SortButton>
                            </Grid2>
                            <Grid2
                                xs={2}
                                className={'flex-center'}
                                paddingLeft={4}
                            >
                                <SortButton
                                    sortOptions={sortOptions}
                                    setSortOptions={setSortOptions}
                                    columnSortType={SortType.Likes}
                                    columnName={t('list.likes')}
                                ></SortButton>
                            </Grid2>
                        </Grid2>
                    </Box>
                    <List className="full-width">
                        {sortedItems.map((it, i) => (
                            <ShoppingListItem item={it} key={i} />
                        ))}
                    </List>
                </div>
            )}
        </div>
    );
};

export default ShoppingListTab;
