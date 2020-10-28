import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import React, {useCallback, useEffect, useState} from 'react';
import {Modal} from '..';

const ProductsTable = ({products, loaded, onClickProduct}) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <Grid>
            <Typography variant="h1" component="h2" gutterBottom>
                Table
            </Typography>
            {!products.length || loaded ? (
                <SkeletTable rows={rowsPerPage} />
            ) : (
                <TableWithProducts
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

const TableWithProducts = ({products, rowsPerPage, setRowsPerPage, onClickProduct}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        setFilteredProducts(
            products.filter(({article}) =>
                article.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery]);

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback(event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const handleChangeSearchQuery = useCallback(e => {
        setSearchQuery(e.target.value);
    }, []);

    const handleClickToProduct = useCallback(item => {
        onClickProduct(item);
    }, []);

    return (
        <TableContainer>
            <TextField
                onChange={handleChangeSearchQuery}
                value={searchQuery}
                label="Поиск по артикулу"
            />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Код ПМ</TableCell>
                        <TableCell>Артикул</TableCell>
                        <TableCell>Цена</TableCell>
                        <TableCell>Количество</TableCell>
                        <TableCell>Вес в кг</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map(item => (
                            <TableRow
                                key={item.code}
                                onClick={() => handleClickToProduct(item)}
                            >
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.article}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.count}</TableCell>
                                <TableCell>{item.netWeight}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default ProductsTable;
