import Grid2 from '@mui/material/Unstable_Grid2';
import {
    Box,
    Checkbox,
    IconButton,
    Link,
    ListItem,
    Typography,
} from '@mui/material';
import {
    Edit,
    NotificationsActive,
    NotificationsNone,
} from '@mui/icons-material';
import styles from './OrderListItem.module.css';
import { useTranslation } from 'react-i18next';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { formatDate } from '../../utility/date-helper';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface OrderListItemProps {
    list: ShoppingListDto;
}

const OrderListItem = (props: OrderListItemProps): JSX.Element => {
    const { t } = useTranslation();
    const { list } = props;
    const navigate = useNavigate();
    return (
        <ListItem divider={true}>
            <Grid2
                container
                rowSpacing={-4}
                xs={12}
                justifyContent="space_between"
            >
                <Grid2 xs={1} className={styles.notifyButton} minWidth={45}>
                    {moment(list.expectedDeliveryDate, true).isAfter(
                        new Date()
                    ) && (
                        <Box>
                            <Checkbox
                                icon={<NotificationsNone />}
                                checkedIcon={<NotificationsActive />}
                            ></Checkbox>
                        </Box>
                    )}
                </Grid2>
                <Grid2
                    container
                    xs={10}
                    rowSpacing={-2}
                    className={styles.textRows}
                >
                    <div>
                        <Link
                            onClick={() => {
                                navigate(`/order/${list.id}`);
                            }}
                        >
                            <Typography
                                color="info.main"
                                variant="h3"
                                fontWeight="medium"
                                marginBottom="0.5rem"
                            >
                                {list.name}
                            </Typography>
                        </Link>
                        <Typography variant="body1">
                            {t('list.due_date') + ': '}
                            {formatDate(list.dueDate, 'D.M.YYYY HH:MM')}
                        </Typography>
                        <Typography variant="body1">
                            {t('list.expected_delivery_date') + ': '}
                            {formatDate(list.expectedDeliveryDate)}
                        </Typography>
                    </div>
                </Grid2>
                <Grid2
                    container
                    xs={1}
                    className={styles.utilityButtons}
                    columnSpacing={7}
                >
                    <IconButton
                        onClick={() => navigate(`/editshoppinglist/${list.id}`)}
                    >
                        <Edit />
                    </IconButton>
                </Grid2>
            </Grid2>
        </ListItem>
    );
};

export default OrderListItem;
