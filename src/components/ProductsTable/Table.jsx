import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from '@material-ui/core';
import {Edit} from '@material-ui/icons';
import React, {useCallback, useEffect, useState} from 'react';

const TableWithProducts = ({
    products,
    rowsPerPage,
    setRowsPerPage,
    onClickProduct
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (!searchQuery) return setFilteredProducts(products);
        setPage(0);
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
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map(item => (
                            <TableRow key={item.code}>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.article}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.count}</TableCell>
                                <TableCell>{item.netWeight}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() =>
                                            handleClickToProduct(item)
                                        }
                                    >
                                        <Edit />
                                    </IconButton>
                                </TableCell>
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

export default React.memo(TableWithProducts);
