import Grid2 from '@mui/material/Unstable_Grid2';
import { Box, Checkbox, Divider, IconButton, Typography } from '@mui/material';
import {
    Delete,
    Edit,
    ArrowForwardIos,
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
            <Grid2 container className="flex-center" xs={12} rowSpacing={-4}>
                <Grid2 xs={1} md={1} className={styles.notifyButton}>
                    <Checkbox
                        icon={<NotificationsNone />}
                        checkedIcon={<NotificationsActive />}
                        size="small"
                    ></Checkbox>
                </Grid2>
                <Grid2
                    container
                    xs={10}
                    md={8}
                    className="flex-left"
                    rowSpacing={-2}
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
                <Grid2 xs={1} md={3}>
                    <Box display={{ xs: 'none', md: 'inline' }}>
                        <IconButton>
                            <Delete />
                        </IconButton>
                        <IconButton>
                            <Edit />
                        </IconButton>
                    </Box>
                    <IconButton>
                        <ArrowForwardIos />
                    </IconButton>
                </Grid2>
            </Grid2>
            <Divider style={{ width: '100%' }}></Divider>
        </div>
    );
};

export default ShoppingListsItem;
