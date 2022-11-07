import {
    Add,
    ContentCopy,
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
import { useNavigate } from 'react-router-dom';
import { OfficeDto } from '../../models/office/OfficeDto';
import AdminShoppingListItem from '../shopping-list-item/AdminShoppingListItem';

interface AdminShoppingListTabProps {
    list: ShoppingListDto;
    value: number;
    office: OfficeDto;
}

const AdminShoppingListTab = (
    props: AdminShoppingListTabProps
): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { value, list, office } = props;

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
                            <Typography variant="body2">
                                {office.name}
                            </Typography>
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
                                onClick={() => navigate(`/addItem/${list.id}`)}
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
                            <Box
                                component={Grid2}
                                sm={1}
                                display={{ xs: 'none', md: 'inline' }}
                            />
                            <Grid2 xs={8} sm={7}>
                                <Typography variant="body1">
                                    {t('list.item_details')}
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
                            <Grid2 xs={2} className={'flex-center'}>
                                <Typography variant="body1">
                                    {t('list.check')}
                                </Typography>
                            </Grid2>
                        </Grid2>
                    </Box>
                    <List className="full-width">
                        {list.items.map((it, i) => (
                            <AdminShoppingListItem item={it} key={i} />
                        ))}
                    </List>
                </div>
            )}
        </div>
    );
};

export default AdminShoppingListTab;
