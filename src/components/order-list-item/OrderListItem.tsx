import Grid2 from '@mui/material/Unstable_Grid2';
import {
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

interface OrderListItemProps {
    list: ShoppingListDto;
}

const OrderListItem = (props: OrderListItemProps): JSX.Element => {
    const { t } = useTranslation();
    const { list } = props;

    return (
        <ListItem divider={true}>
            <Grid2 container rowSpacing={-4} xs={12}>
                <Grid2
                    xs={0}
                    className={styles.notifyButton}
                    sx={{ display: 'none' }}
                >
                    <Checkbox
                        icon={<NotificationsNone />}
                        checkedIcon={<NotificationsActive />}
                    ></Checkbox>
                </Grid2>
                <Grid2
                    container
                    xs={10}
                    rowSpacing={-2}
                    className={styles.textRows}
                >
                    <div>
                        <Link>
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
                            {t('order.due_date')}
                            {formatDate(list.dueDate)}
                        </Typography>
                        <Typography variant="body1">
                            {t('order.expected_delivery_date')}
                            {formatDate(list.expectedDeliveryDate)}
                        </Typography>
                    </div>
                </Grid2>
                <Grid2 xs={2} className={styles.utilityButtons}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Grid2>
            </Grid2>
        </ListItem>
    );
};

export default OrderListItem;
