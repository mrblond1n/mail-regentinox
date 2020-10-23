import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import {HOME} from '../constants/routes';
import {Grid, Typography} from '@material-ui/core';
import {AuthForm} from '../components';

const fields = [
    {name: 'firstName', type: 'text', placeholder: 'Имя'},
    {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
    {name: 'email', type: 'text', placeholder: 'Email'},
    {name: 'password', type: 'password', placeholder: 'Password'},
    {name: 'confirmPassword', type: 'password', placeholder: 'Confirm password'}
];

export default function SignUp() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.firebase.auth);
    const authError = useSelector(state => state.auth.authError);

    if (auth.uid) return <Redirect to={HOME} />;
    const signUpUser = user => dispatch(signUp(user));

    
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography variant="h3" component="h1" gutterBottom>
                Регистрация
            </Typography>
            <div>{authError}</div>
            <AuthForm fields={fields} onSubmit={signUpUser} />
        </Grid>
    );
}
