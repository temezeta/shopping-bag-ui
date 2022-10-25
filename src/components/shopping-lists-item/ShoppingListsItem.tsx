import Grid2 from '@mui/material/Unstable_Grid2';
import { Checkbox, Divider, IconButton, Typography } from '@mui/material';
import {
    Delete,
    Edit,
    NotificationsActive,
    NotificationsNone,
} from '@mui/icons-material';
import styles from './ShoppingListsItem.module.css';
import { useTranslation } from 'react-i18next';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { formatDate } from '../../utility/date-helper';

interface ShoppingListsItemProps {
    list: ShoppingListDto;
}

const ShoppingListsItem = (props: ShoppingListsItemProps): JSX.Element => {
    const { t } = useTranslation();
    const { list } = props;

    return (
        <div style={{ width: '100%' }}>
            <Grid2 container rowSpacing={-4}>
                <Grid2
                    xs={2}
                    sm={1}
                    order={{ xs: 1, sm: 0 }}
                    className={styles.notifyButton}
                >
                    <Checkbox
                        // style={{ minWidth: 0, paddingLeft: 0 }}
                        icon={<NotificationsNone />}
                        checkedIcon={<NotificationsActive />}
                    ></Checkbox>
                </Grid2>
                <Grid2
                    container
                    xs={12}
                    sm={9}
                    rowSpacing={-2}
                    className={styles.textRows}
                >
                    <div>
                        <Typography color="info.main" variant="body1">
                            {list.name}
                        </Typography>
                        <Typography variant="body2">
                            {t('lists.due_date')}
                            {formatDate(list.dueDate)}
                        </Typography>
                        <div>
                            {t('lists.expected_delivery_date')}
                            {formatDate(list.expectedDeliveryDate)}
                        </div>
                    </div>
                </Grid2>
                <Grid2
                    xs={2}
                    sm={1}
                    order={{ xs: 2, sm: 2 }}
                    className={styles.utilityButtons}
                >
                    <IconButton>
                        <Delete />
                    </IconButton>
                </Grid2>
                <Grid2
                    xs={2}
                    sm={1}
                    order={{ xs: 2, sm: 2 }}
                    className={styles.utilityButtons}
                >
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Grid2>
            </Grid2>
            <Divider style={{ width: '100%' }}></Divider>
        </div>
    );
};

export default ShoppingListsItem;
