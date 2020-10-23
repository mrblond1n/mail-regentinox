import {Button, Grid, makeStyles, TextField} from '@material-ui/core';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '../store';
import {inputsForCreateProduct} from '../utils/fields';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch'
        },
        display: 'flex',
        flexDirection: 'column'
    }
}));

const Storage = () => {
    const classes = useStyles();
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(actions.createProduct(product));
    };
    const handleChange = e => {
        setProduct({...product, [e.target.name]: e.target.value});
    };
    
    return (
        <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
        >
            <form className={classes.root} noValidate autoComplete="off">
                {inputsForCreateProduct.map(({title, name, label}) => (
                    <React.Fragment key={name}>
                        <TextField title={title} label={label} name={name} onChange={handleChange} />
                    </React.Fragment>
                ))}
            </form>
            <Button variant="outlined" color="primary" type="submit" onClick={handleSubmit}>
                Создать
            </Button>
        </Grid>
    );
};

export default Storage;
