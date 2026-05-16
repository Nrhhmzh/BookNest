import { createTheme, lighten, darken } from '@mui/material/styles';

const primaryMain = '#F6B1CE';

const theme = createTheme({
    palette: {
        primary: {
            light: lighten(primaryMain, 0.15),
            main: primaryMain,
            dark: darken(primaryMain, 0.15),
            contrastText: '#ffffff',
        },
        secondary: {
            main: "#3DB6B1",
            contrastText: '#fff',
        },
        success: { main: '#59B292' },
        info: { main: '#8CC0EB' },
        warning: { main: '#FFC94D' },
        error: { main: '#FA6781' },
        background: {
            default: '#fcfcfc',  
            paper: '#ffffff',   
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
    shape: {
      borderRadius: 8,
    }
});

export default theme;