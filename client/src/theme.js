import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Inter',
  },
});

export default theme;