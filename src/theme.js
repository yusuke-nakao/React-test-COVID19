import { createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';

export const theme = createMuiTheme({
    palette:{
        primary:{
            light: '#42a5f5',
            main: '#1976d2',
            dark: '#0d47a1',
        },
        secondary:pink,
    }
})