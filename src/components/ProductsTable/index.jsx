import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from '@material-ui/core';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

const ProductsTable = ({products}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeSearchQuery = e => {
        setSearchQuery(e.target.value);
    };

    const handleClickToProduct = item => {
        console.log(item.code);
    };

    useEffect(() => {
        setFilteredProducts(
            products.filter(({article}) =>
                article.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery]);

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
