import styled from '@emotion/styled';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, IconButton, MenuItem, MenuList, Tab } from '@mui/material';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import { useState, MouseEvent } from 'react';
import styles from './DropdownMenu.module.css';

export interface DropdownMenuItem {
    title: React.ReactNode;
    onClick?: () => void | Promise<void>;
}

interface DropdownMenuProps {
    title: React.ReactNode;
    items: DropdownMenuItem[];
    icon?: JSX.Element;
    isTab?: boolean;
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        '&::before': {
            backgroundColor: theme.palette.secondary.light,
            content: '""',
            display: 'block',
            position: 'absolute',
            width: 10,
            height: 10,
            top: -5,
            transform: 'rotate(45deg)',
            right: '10%',
        },
        overflow: 'unset',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.secondary.light,
    },
}));

const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const handleItemClick = async (item: DropdownMenuItem): Promise<void> => {
        await item.onClick?.();
        handleClose();
    };

    const getButtonComponent = (): JSX.Element => {
        const { isTab, title, ...rest } = props;
        if (isTab) {
            return (
                <Tab
                    component="button"
                    icon={<KeyboardArrowDown fontSize="small" />}
                    iconPosition="end"
                    onClick={handleClick}
                    label={title}
                    {...rest}
                />
            );
        }

        return (
            <>
                <Box
                    display={{
                        xs: props.icon ? 'none' : 'inline',
                        sm: 'inline',
                    }}
                >
                    <Button
                        variant="text"
                        className={styles.menuText}
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDown />}
                    >
                        {props.title}
                    </Button>
                </Box>
                <Box
                    display={{ xs: props.icon ? 'inline' : 'none', sm: 'none' }}
                >
                    <IconButton
                        onClick={handleClick}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            },
                        }}
                    >
                        {props.icon}
                    </IconButton>
                </Box>
            </>
        );
    };

    return (
        <div>
            {getButtonComponent()}
            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuList className={styles.menuItems}>
                    {props.items.map((item, i) => (
                        <MenuItem
                            key={i}
                            onClick={async () => await handleItemClick(item)}
                        >
                            {item.title}
                        </MenuItem>
                    ))}
                </MenuList>
            </StyledMenu>
        </div>
    );
};

export default DropdownMenu;
