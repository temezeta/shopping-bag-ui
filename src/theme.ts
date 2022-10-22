import { createTheme, LinkProps } from '@mui/material';
import LinkBehaviour from './components/link-behaviour/LinkBehaviour';

const defaultTheme = createTheme(); // Create a default theme so we can use breakpoints easily etc.

const HuldTheme = createTheme({
    typography: {
        fontSize: 17,
        fontFamily: "'Fira Sans', sans-serif",
        h1: {
            fontFamily: "'trebuchet ms', 'Fira Sans', sans-serif",
            fontSize: '3.5rem',
            fontWeight: 'bold',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '2rem',
            },
        },
        h2: {
            fontFamily: "'trebuchet ms', 'Fira Sans', sans-serif",
            fontSize: '2rem',
            fontWeight: 'bold',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '1.5rem',
            },
        },
        h3: {
            fontFamily: "'trebuchet ms', 'Fira Sans', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        body2: {
            fontSize: '0.9rem',
        },
    },
    palette: {
        primary: {
            main: '#0047f2',
            dark: '#00173a',
            light: '#c2d1fa',
        },
        secondary: {
            main: '#00173a',
            dark: '#00173a',
            light: '#80a4ff',
        },
        info: {
            main: '#ff5e89',
        },
        text: {
            primary: '#05133d',
            secondary: '#ffffff',
        },
        action: {
            disabled: '#868686',
            disabledBackground: '#d9d9d9',
        },
    },
    spacing: 8, // Defines pixel scaling -> theme.spacing(1) -> 8px -> space-xxs
    // Style overrides for specific components go here

    shape: {
        borderRadius: 0,
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.color === 'primary' && {
                        color: theme.palette.text.primary,
                    }),
                }),
            },
        },
        MuiLink: {
            // https://github.com/mui/material-ui/issues/29942
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            defaultProps: {
                component: LinkBehaviour,
            } as LinkProps,
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.info.main,
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: ({ theme }) => ({
                    borderColor: theme.palette.action.disabledBackground,
                }),
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.light,
                    '&$checked': {
                        color: theme.palette.primary.main,
                    },
                }),
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.color === 'primary' && {
                        color: theme.palette.text.primary,
                        '& .MuiTabs-indicator': {
                            backgroundColor: theme.palette.info.main,
                            height: '4px',
                        },
                    }),
                    ...(ownerState.color === 'secondary' && {
                        color: theme.palette.text.secondary,
                        '& .MuiTabs-indicator': {
                            display: 'none',
                        },
                    }),
                }),
            },
        },
        MuiTab: {
            styleOverrides: {
                root: ({ theme }) => ({
                    textTransform: 'none',
                    color: 'inherit',
                    opacity: 1,
                    '&.Mui-selected': {
                        color: theme.palette.info.main,
                        fontWeight: 'bold',
                    },
                }),
            },
        },
    },
});

export default HuldTheme;
