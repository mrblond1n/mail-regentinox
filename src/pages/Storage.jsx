import {makeStyles} from '@material-ui/core';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ProductForm} from '../components';
import UploadXlsx from '../components/UploadXlsx';
import {actions} from '../store';


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
        <div>
            <ProductForm />
            <UploadXlsx onGetProducts={() => {}} />
        </div>
    );
};

export default Storage;
