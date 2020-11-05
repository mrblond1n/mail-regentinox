import {Button, Checkbox, FormControlLabel, Grid, makeStyles} from '@material-ui/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {DownloadXml, Modal, ProductForm, ProductsTable} from '../components/';
import {actions, selectors} from '../store';
import {prepareProductForUpdate} from '../utils/prepareData';

const useStyles = makeStyles(() => ({
    separator: {
        height: '2px',
        width: '100%',
        background: 'darkgray',
        margin: '2rem 0'
    },
    button: {
        marginTop: '10px'
    }
}));

export default function Home() {
    useFirestoreConnect([{collection: 'products'}]);
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const productsList = useSelector(selectors.products) || [];
    const isLoading = useSelector(selectors.isLoading);
    
    const [testMode, setTestMode] = useState(false);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(null);

    const handleUpdates = useCallback(
        data => {
            const products = prepareProductForUpdate(data, productsList);

            dispatch(actions.updateProducts({products, testMode}));
        },
        [productsList, testMode]
    );

    const handleUpdate = useCallback(product => {
        const id = product?.id;

        dispatch(
            product.id
                ? actions.updateProduct({id, product, testMode})
                : actions.createProduct({product, testMode})
        );
        setShow(false);
    }, [testMode]);

    const handleRemove = useCallback(product => {
        const id = product?.id;

        dispatch(actions.removeProduct({id, testMode}));
        setShow(false);
    }, [testMode]);

    // const handleAddItems = useCallback(products => {
    //     dispatch(actions.addProducts({products, testMode}));
    // }, [testMode]);

    const handleSwitchTestMode = useCallback(() => setTestMode(!testMode), [testMode]);

    const handleRowClick = useCallback(index => {
        setProduct(productsList[index]);
        switchShowModal();
    }, [productsList]);

    const switchShowModal = useCallback(() => {
        setShow(!show);
    }, [show]);

    useEffect(() => {
        if (!show) setProduct(null);
    }, [show]);

    return (
        <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
        >
            <ProductsTable
                products={productsList}
                loaded={isLoading}
                onRowClick={handleRowClick}
            />

            {/* <UploadXlsx onSubmit={handleAddItems} /> */}

            <Button
                className={classes.button}
                color="secondary"
                variant="contained"
                onClick={switchShowModal}
            >
                Добавить продукт
            </Button>
            <div className={classes.separator} />
            <DownloadXml products={productsList} onUpdate={handleUpdates} />
            <FormControlLabel
                label="Тестовый режим"
                checked={testMode}
                onChange={handleSwitchTestMode}
                control={<Checkbox color="primary" />}
            />
            <Modal show={show} onClose={switchShowModal} item={product}>
                <ProductForm
                    item={product}
                    onSubmit={handleUpdate}
                    onRemove={handleRemove}
                />
            </Modal>
        </Grid>
    );
}
