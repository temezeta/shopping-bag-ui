import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import {
    Box,
    DialogContentText,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { removeItemAsync } from '../../store/shopping-list/shopping-list-slice';
import ConfirmationDialog from '../confirmation-popup/ConfirmationDialog';
import styles from './ShoppingListItemActions.module.css';

interface ShoppingListItemProps {
    id: number;
}

const ShoppingListItemActions = (props: ShoppingListItemProps): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [isModifyOpen, setModifyOpen] = useState<boolean>(false);

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const handleDelete = (): void => {
        setModifyOpen(true);
    };

    const removeItem = async (): Promise<void> => {
        await dispatch(removeItemAsync(props.id));
        setModifyOpen(false);
        handleClose();
    };

    return (
        <div>
            <IconButton aria-label="actions" onClick={handleClick}>
                <MoreHoriz />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        '& .MuiMenuItem-root.Mui-selected': {
                            backgroundColor: 'transparent',
                        },
                        '& .MuiMenuItem-root:hover': {
                            backgroundColor: 'transparent',
                        },
                        '& .MuiMenuItem-root.Mui-selected:hover': {
                            backgroundColor: 'transparent',
                        },
                    },
                }}
            >
                <MenuItem>
                    <Box className={styles.actionList}>
                        <Tooltip title={t('list.delete-item')} enterDelay={800}>
                            <IconButton
                                aria-label="delete"
                                onClick={handleDelete}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('list.edit-item')} enterDelay={800}>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() =>
                                    navigate(`/editItem/${props.id}`)
                                }
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </MenuItem>
            </Menu>
            <ConfirmationDialog
                open={isModifyOpen}
                onConfirm={async () => await removeItem()}
                onCancel={() => setModifyOpen(false)}
                title={t('list.delete-item')}
            >
                <DialogContentText>
                    {t('dialogs.confirmation')}
                </DialogContentText>
            </ConfirmationDialog>
        </div>
    );
};

export default ShoppingListItemActions;
