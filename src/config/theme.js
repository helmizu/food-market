import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1AA108',
    },
    secondary: {
      main: '#8D92A3',
    },
    error: {
      main: red.A400,
    },
    info: {
      main: '#1ABC9C',
    }
  },
});

export default theme;