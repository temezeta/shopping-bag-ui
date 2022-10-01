import { createTheme } from '@mui/material';

const defaultTheme = createTheme(); // Create a default theme so we can use breakpoints easily etc.

const HuldTheme = createTheme({
    typography: {
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: 20,
        h1: {
            fontSize: '3.5rem',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '2rem',
            },
        },
        h2: {
            fontSize: '2rem',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '1.5rem',
            },
        },
        h3: {
            fontSize: '1.5rem',
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
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.color === 'primary' && {
                        color: '#05133d',
                    }),
                }),
            },
        },
    },
});

export default HuldTheme;
