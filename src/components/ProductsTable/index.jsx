import {Box, IconButton} from '@material-ui/core';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Edit} from '@material-ui/icons';
import {Skeleton} from '@material-ui/lab';
import MUIDataTable from 'mui-datatables';
import React, {useState} from 'react';

const Table = ({
    products,
    onRowClick,
    loaded,
    title = 'Продукция на складе'
}) => {
    const [rowsPerPage] = useState(10);

    if (!products.length || loaded) return <SkeletTable rows={rowsPerPage} />;

    const options = {
        download: false,
        filter: false,
        print: false,
        rowsPerPage,
        viewColumns: false,
        selectableRows: 'none'
    };

    const columns = getColumns(onRowClick);

    return (
        <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title={title}
                data={products}
                filter={false}
                columns={columns}
                options={options}
            />
        </MuiThemeProvider>
    );
};

export default React.memo(Table);

const SkeletTable = ({rows}) => (
    <Box>
        {Array.from(Array(rows), (_, i) => (
            <Skeleton height={50} width={500} key={i} />
        ))}
    </Box>
);

const getMuiTheme = () =>
    createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    padding: '5px 10px'
                }
            }
        },
        typography: {
            fontFamily: 'Blender Pro',
            fontSize: 16
        },
    });

const getColumns = onRowClick => [
    {
        name: 'id',
        options: {
            display: false
        }
    },
    {
        name: 'code',
        label: 'Код ПМ',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'article',
        label: 'Артикул',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'price',
        label: 'Цена',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'count',
        label: 'Количество',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'netWeight',
        label: 'Вес в кг',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'Действия',
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: productIndex => (
                <IconButton
                    onClick={() => onRowClick(productIndex)}
                    size="small"
                >
                    <Edit />
                </IconButton>
            )
        }
    }
];
