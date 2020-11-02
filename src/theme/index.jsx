import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import React from 'react';

const getThemeStyle = mode =>
    createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    padding: '5px 10px'
                }
            }
        },
        palette: {
            type: mode
        },
        typography: {
            fontFamily: 'Blender Pro',
            fontSize: 16
        }
    });

const Theme = ({children, mode}) => {
    const theme = getThemeStyle(mode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
