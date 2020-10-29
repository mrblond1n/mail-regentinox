import {Backdrop, CircularProgress, createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core';
import React from 'react';
import {render} from 'react-dom';
import {Provider, useSelector} from 'react-redux';
import {isLoaded, ReactReduxFirebaseProvider} from 'react-redux-firebase';
import App from './layouts';
import {rrfProps, selectors, store} from './store';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Blender Pro',
        fontSize: 16
    },
});

function AuthIsLoaded({children}) {
    const classes = useStyles();
    const auth = useSelector(selectors.isAuth);

    if (!isLoaded(auth)) return (
        <Backdrop className={classes.backdrop} open>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
		
    return children;
}

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <AuthIsLoaded>
                    <App />
                </AuthIsLoaded>
            </ReactReduxFirebaseProvider>
        </ThemeProvider>
    </Provider>
);

render(app, document.getElementById('root'));
