import { createTheme } from '@mui/material/styles';

const variables = {
  primary_bg: '#FFFFFF',
  primary_font: 'Inter',

  primary_font_color: '#000000',

  logo_font: 'Heebo',

  // Solid color //
  white: '#FFFFFF',
  black: '#000000'
};

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: variables.primary_bg
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: variables.primary_font,
    h1: {
      fontFamily: variables.logo_font,
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

export default theme;