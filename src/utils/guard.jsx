import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router';
import {SIGNIN} from '../constants/routes';

export const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = useSelector(state => state.firebase.auth);

    
    return (
        <Route {...rest} render={props => (auth.uid ? <Component {...props} /> : <Redirect to={SIGNIN} />)} />
    );
};
