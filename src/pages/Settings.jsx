import {Grid, Typography} from '@material-ui/core';
import React from 'react';

const text = 'Что ты здесь потерял?)';

export default function Settings() {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography variant="h3" component="h1" gutterBottom>{text}</Typography>
        </Grid>
    );
}
