import {Box, Grid} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import DownloadXml from '../components/DownloadXml';
import ProductsTable from '../components/ProductsTable';
import {actions, selectors} from '../store';

export default function Home() {
    useFirestoreConnect([{collection: 'products'}]);
    const dispatch = useDispatch();
    const productsList = useSelector(selectors.products) || [];
    // const productsList = [];
    const isLoading = useSelector(selectors.isLoading);

    const handleUpdateProductCount = ({id, count}) =>
        dispatch(actions.updateProduct(id, {count}));
    const handleStartScript = () => dispatch(actions.setStartLoading());
    const handleStopScript = () => dispatch(actions.setStopLoading());

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
            <ProductsTable products={productsList} loaded={isLoading} />
        </Grid>
    );
}
