import {Button, Grid, makeStyles} from '@material-ui/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {DownloadXml, Modal, ProductForm, ProductsTable} from '../components/';
import UploadXlsx from '../components/UploadXlsx';
import {actions, selectors} from '../store';
import {prepareProductForUpdate} from '../utils/prepareData';

const useStyles = makeStyles(() => ({
    separator: {
        height: '2px',
        width: '100%',
        background: 'darkgray',
        margin: '2rem 0'
    }
}));

export default function Home() {
    useFirestoreConnect([{collection: 'products'}]);
    const classes = useStyles();

    const dispatch = useDispatch();
    const productsList = useSelector(selectors.products) || [];
    const isLoading = useSelector(selectors.isLoading);

    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(null);

    const handleUpdates = useCallback(
        products => {
            const data = prepareProductForUpdate(products, productsList);

            dispatch(actions.updateProducts(data));
            setShow(false);
        },
        [productsList]
    );

    const handleUpdate = useCallback(product => {
        dispatch(
            product.id
                ? actions.updateProduct(product.id, product)
                : actions.createProduct(product)
        );
        setShow(false);
    }, []);

    const handleRemove = useCallback(product => {
        dispatch(actions.removeProduct(product.id));
        setShow(false);
    }, []);

    const handleAddItems = useCallback(products => {
        dispatch(actions.addProducts(products));
    }, []);

    const openProductModal = useCallback(item => {
        setProduct(item);
        swithShowModal();
    }, []);

    const swithShowModal = useCallback(() => {
        setShow(!show);
    }, [show]);

    useEffect(() => {
        if (!show) setProduct(null);
    }, []);

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
                onClickProduct={openProductModal}
            />

            {/* <UploadXlsx onSubmit={handleAddItems} /> */}

            <Button
                className={classes.button}
                color="secondary"
                onClick={swithShowModal}
            >
                Добавить продукт
            </Button>
            <div className={classes.separator} />
            <DownloadXml products={productsList} onUpdate={handleUpdates} />
            <Modal show={show} onClose={swithShowModal} item={product}>
                <ProductForm
                    item={product}
                    onSubmit={handleUpdate}
                    onRemove={handleRemove}
                />
            </Modal>
        </Grid>
    );
}
