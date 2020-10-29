import {Grid, Typography} from '@material-ui/core';
import React from 'react';
import {useDispatch} from 'react-redux';
import {ProductForm} from '../components';
import {actions} from '../store';


const Storage = () => {
    const dispatch = useDispatch();

    const handleSubmit = product => {
        dispatch(actions.createProduct(product));
    };
    
    return (
        <Grid>
            <Typography variant="h3" component="h1" gutterBottom>
                Здесь нет ничего
            </Typography>
        </Grid>
    );
};

export default Storage;
