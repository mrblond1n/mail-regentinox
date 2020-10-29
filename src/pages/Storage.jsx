import {Grid, Typography} from '@material-ui/core';
import React from 'react';

const text = 'Здесь нет ничего';

const Storage = () => (
    <Grid>
        <Typography variant="h3" component="h1" gutterBottom>
            {text}
        </Typography>
    </Grid>
);

export default Storage;
