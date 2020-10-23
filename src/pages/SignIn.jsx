import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import {HOME} from '../constants/routes';
import {Grid, Typography} from '@material-ui/core';
import {AuthForm} from '../components';

const fields = [
    {name: 'email', type: 'text', placeholder: 'Email'},
    {name: 'password', type: 'password', placeholder: 'Password'}
];

export default function SignIn() {
    const dispatch = useDispatch();
    const authError = useSelector(state => state.auth.authError);
    const auth = useSelector(state => state.firebase.auth);

    if (auth.uid) return <Redirect to={HOME} />;
    const signInUser = user => dispatch(signIn(user));

    
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography variant="h3" component="h1" gutterBottom>
                Авторизация
            </Typography>
            <div>{authError}</div>
            <AuthForm fields={fields} onSubmit={signInUser} />
        </Grid>
    );
}
