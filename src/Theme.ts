import { createTheme } from '@mui/material';

import { green, purple } from '@mui/material/colors';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}
const LightTheme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});
const DarkTheme = createTheme({

    palette: {
        mode: 'dark',
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

const themes = {
    [Theme.DARK]: DarkTheme,
    [Theme.LIGHT]: LightTheme,
}

export const getTheme = (theme: Theme) => {
    return themes[theme] ;
}