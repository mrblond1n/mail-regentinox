import {Grid} from '@material-ui/core';
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

    const handleUpdateProductCount = ({id, count}) => {
        dispatch(actions.updateProduct(id, {count}));
    };
	
    return (
        <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
        >
            <Grid>
                <DownloadXml products={productsList} onUpdate={handleUpdateProductCount} />
            </Grid>
            <Grid>
                <h1>Таблица</h1>
            </Grid>
            <Grid>
                {productsList.length > 0 && <ProductsTable products={productsList} />}
            </Grid>
        </Grid>
    );
}
