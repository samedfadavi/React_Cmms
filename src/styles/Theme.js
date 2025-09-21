import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/x-data-grid/locales';
const theme = createTheme({
  
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f51b5',
      dark: '#002984',
      contrastText: '#ffffff ',
    },
    secondary: {
      light: '#ff7961',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#000',

    },

  },
  typography: {
    fontFamily: "var(--common-font)", // global font
  },
faIR // your Farsi locale
});

export default theme;