import {
    Add,
    ContentCopy,
    KeyboardArrowDown,
    KeyboardArrowRight,
    KeyboardArrowUp,
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
import Markdown from '../markdown/Markdown';

interface ShoppingListTabProps {
    list: ShoppingListDto;
    value: number;
}

const sortByItemName = (a: ItemDto, b: ItemDto): number => {
    if (typeof a.name === 'undefined' || typeof b.name === 'undefined')
        return 0;
    else return a.name.localeCompare(b.name);
};

const ShoppingListTab = (props: ShoppingListTabProps): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { value, list } = props;
    const [sortedItems, setSortedItems] = useState<ItemDto[]>(list.items);
    const [sortOptions, setSortOptions] = useState<{
        sortType: string;
        sortDescending: boolean;
    }>({
        sortType: 'none',
        sortDescending: false,
    });

    useEffect(() => {
        let sortFunction;
        switch (sortOptions.sortType) {
            case 'itemName':
                sortFunction = sortByItemName;
                break;
        }
        if (sortOptions.sortDescending) {
            const _sortedItems = [...list.items].sort(sortFunction);
            setSortedItems(_sortedItems);
        } else {
            const _sortedItems = [...list.items].sort(sortFunction).reverse();
            setSortedItems(_sortedItems);
        }
    }, [sortOptions]);

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
                            {/** TODO: Copy functionality */}
                            <IconButton className={styles.copyButton}>
                                <ContentCopy />
                            </IconButton>
                            <Typography
                                variant="h1"
                                display="flex"
                                justifyContent="center"
                            >
                                {list.name}
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
                                fullWidth
                            >
                                {t('actions.add_new_item')}
                            </Button>
                        </Grid2>
                        <Grid2
                            md={2}
                            xs={3}
                            order={{ xs: 2, md: 2 }}
                            className="flex-center"
                        >
                            <div>
                                <div>{t('list.due_date')}</div>
                                <div>{formatDate(list.dueDate)}</div>
                            </div>
                        </Grid2>
                        <Grid2
                            md={1}
                            xs={2}
                            order={{ xs: 1, md: 3 }}
                            className="flex-center"
                        >
                            {/** TODO: Notification functionality */}
                            <Checkbox
                                icon={<NotificationsNone />}
                                checkedIcon={<NotificationsActive />}
                            ></Checkbox>
                        </Grid2>
                        <Grid2
                            md={4}
                            xs={7}
                            order={{ xs: 3, md: 4 }}
                            className="flex-center"
                        >
                            <div>
                                <div className={styles.expectedDate}>
                                    {t('list.expected_delivery_date')}
                                </div>
                                <div className={styles.expectedDate}>
                                    {formatDate(list.expectedDeliveryDate)}
                                </div>
                            </div>
                        </Grid2>
                    </Grid2>
                    <Box className={styles.shoppingListHeader}>
                        <Grid2 container spacing={2} alignItems="center">
                            <Grid2 xs={8}>
                                <Typography variant="body1">
                                    {t('list.item_details')}
                                    <IconButton
                                        onClick={() =>
                                            sortOptions.sortType !== 'itemName'
                                                ? setSortOptions({
                                                      sortType: 'itemName',
                                                      sortDescending: true,
                                                  })
                                                : setSortOptions({
                                                      sortType: 'itemName',
                                                      sortDescending:
                                                          !sortOptions.sortDescending,
                                                  })
                                        }
                                    >
                                        {sortOptions.sortType === 'itemName' ? (
                                            sortOptions.sortDescending ? (
                                                <KeyboardArrowDown />
                                            ) : (
                                                <KeyboardArrowUp />
                                            )
                                        ) : (
                                            <KeyboardArrowRight />
                                        )}
                                    </IconButton>
                                </Typography>
                            </Grid2>
                            <Grid2 xs={2} className={'flex-center'}>
                                <Typography variant="body1">
                                    {t('list.likes')}
                                </Typography>
                            </Grid2>
                            <Grid2 xs={2} className={'flex-center'}>
                                <Typography variant="body1">
                                    {t('list.actions')}
                                </Typography>
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
