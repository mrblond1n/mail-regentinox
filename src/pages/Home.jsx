import {Grid} from '@material-ui/core';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {Modal} from '../components';
import DownloadXml from '../components/DownloadXml';
import ProductsTable from '../components/ProductsTable';
import {actions, selectors} from '../store';

export default function Home() {
    useFirestoreConnect([{collection: 'products'}]);
    const dispatch = useDispatch();
    const productsList = useSelector(selectors.products) || [];
    const isLoading = useSelector(selectors.isLoading);

    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(null);

    const handleUpdateProductCount = useCallback(({id, count}) => {
        dispatch(actions.updateProduct(id, {count}));
    }, []);

    const handleStartScript = useCallback(() => {
        dispatch(actions.setStartLoading());
    }, []);

    const handleStopScript = useCallback(() => {
        dispatch(actions.setStopLoading());
    }, []);

    const openProductModal = useCallback(item => {
        setProduct(item);
        swithShowModal();
    }, []);

    const swithShowModal = useCallback(() => {
        setShow(!show);
    }, [show]);

    return (
        <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
        >
            <DownloadXml
                products={productsList}
                onUpdate={handleUpdateProductCount}
                onStart={handleStartScript}
                onFinish={handleStopScript}
            />
            <ProductsTable
                products={productsList}
                loaded={isLoading}
                onClickProduct={openProductModal}
            />
            <Modal show={show} onClose={swithShowModal} item={product} />
        </Grid>
    );
}
