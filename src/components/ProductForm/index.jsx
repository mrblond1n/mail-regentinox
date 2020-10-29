import {Button, Grid, makeStyles, TextField} from '@material-ui/core';
import React, {useCallback, useEffect, useState} from 'react';
import {inputsForCreateProduct} from '../../utils/fields';

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
const ProductForm = ({onSubmit, item}) => {
    const classes = useStyles();
    const [product, setProduct] = useState({});
    const buttonText = item ? 'Изменить' : 'Создать';

    const handleSubmit = useCallback(() => {
        onSubmit(product);
    }, [product]);

    const handleChange = e => {
        setProduct({...product, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (!item) return;
        const itemObject = {};

        Object.entries(item).forEach(
            ([key, value]) => (itemObject[key] = value)
        );
        setProduct(itemObject);
    }, [item]);

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
                        <TextField
                            title={title}
                            label={label}
                            name={name}
                            onChange={handleChange}
                            defaultValue={item?.[name]}
                        />
                    </React.Fragment>
                ))}
            </form>
            <Button
                variant="outlined"
                color="primary"
                type="submit"
                onClick={handleSubmit}
            >
                {buttonText}
            </Button>
        </Grid>
    );
};

export default ProductForm;
