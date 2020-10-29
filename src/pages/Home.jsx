import {Grid} from '@material-ui/core';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import {DownloadXml, Modal, ProductForm, ProductsTable} from '../components/';
import {actions, selectors} from '../store';
import {prepareProductForUpdate} from '../utils/prepareData';

export default function Home() {
    useFirestoreConnect([{collection: 'products'}]);
    const dispatch = useDispatch();
    const productsList = useSelector(selectors.products) || [];
    const isLoading = useSelector(selectors.isLoading);

    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(null);

    const handleUpdateProducts = useCallback(
        products => {
            const data = prepareProductForUpdate(products, productsList);

            dispatch(actions.updateProducts(data));
        },
        [productsList]
    );

    const handleUpdateProduct = useCallback(product => {
        dispatch(actions.updateProduct(product.id, product));
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
                onUpdate={handleUpdateProducts}
            />
            <ProductsTable
                products={productsList}
                loaded={isLoading}
                onClickProduct={openProductModal}
            />
            <Modal show={show} onClose={swithShowModal} item={product}>
                <ProductForm item={product} onSubmit={handleUpdateProduct} />
            </Modal>
        </Grid>
    );
}
