import {Box, Grid, Typography} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import React, {useState} from 'react';
import Table from './Table';

const ProductsTable = ({products, loaded, onClickProduct}) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <Grid>
            <Typography variant="h1" component="h2" gutterBottom>
                Таблица с товарами
            </Typography>
            {!products.length || loaded ? (
                <SkeletTable rows={rowsPerPage} />
            ) : (
                <Table
                    products={products}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    onClickProduct={onClickProduct}
                />
            )}
        </Grid>
    );
};

const SkeletTable = ({rows}) => (
    <Box>
        {Array.from(Array(rows), (_, i) => (
            <Skeleton height={50} width={500} key={i} />
        ))}
    </Box>
);

export default ProductsTable;
