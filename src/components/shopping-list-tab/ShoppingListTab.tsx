import {
    Add,
    ContentCopy,
    NotificationsActive,
    NotificationsNone,
} from '@mui/icons-material';
import { Button, Checkbox, IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'react-i18next';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import styles from './ShoppingListTab.module.css';
import { formatDate } from '../../utility/date-helper';

interface ShoppingListTabProps {
    list: ShoppingListDto;
    value: number;
}

const ShoppingListTab = (props: ShoppingListTabProps): JSX.Element => {
    const { t } = useTranslation();
    const { value, list } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== list.id}
            id={`shopping-list-tabpanel-${list.id}`}
            className={styles.tabRoot}
        >
            {value === list.id && (
                <Grid2 container spacing={2} className="flex-center">
                    <Grid2 xs={12} className="flex-center">
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
                        <Typography variant="body2">{list.comment}</Typography>
                    </Grid2>
                    <Grid2 md={4} xs={12} className="flex-center">
                        <Button
                            startIcon={<Add />}
                            variant="contained"
                            fullWidth
                        >
                            {t('actions.add_new_item')}
                        </Button>
                    </Grid2>
                    <Grid2 md={2} xs={3} className="flex-center">
                        <div>
                            <div>{t('list.due_date')}</div>
                            <div>{formatDate(list.dueDate)}</div>
                        </div>
                    </Grid2>
                    <Grid2 md={1} xs={2} className="flex-center">
                        {/** TODO: Notification functionality */}
                        <Checkbox
                            icon={<NotificationsNone />}
                            checkedIcon={<NotificationsActive />}
                        ></Checkbox>
                    </Grid2>
                    <Grid2 md={4} xs={7} className="flex-center">
                        <div>
                            <div className={styles.expectedDate}>
                                {t('list.expected_delivery_date')}
                            </div>
                            <div className={styles.expectedDate}>
                                {formatDate(list.expectedDeliveryDate)}
                            </div>
                        </div>
                    </Grid2>
                    <Grid2 xs={12}>
                        {/** TODO: Table for items */}
                        {list.items.map((it, i) => (
                            <div key={i}>{it.name}</div>
                        ))}
                    </Grid2>
                </Grid2>
            )}
        </div>
    );
};

export default ShoppingListTab;
