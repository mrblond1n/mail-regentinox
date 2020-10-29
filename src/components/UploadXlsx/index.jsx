import {Button, ButtonGroup} from '@material-ui/core';
import React, {useCallback, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {parserDataFromXlsxFile} from '../../utils';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}));

const buttonTextUpload = 'Загрузить таблицу';
const buttonConfirmText = 'Получить данные таблицы';
const onConfirm = '';

const UploadXlsx = ({onGetProducts}) => {
    const [file, setFile] = useState(null);
    const input = useRef();
    
    const handleTableData = () => parserDataFromXlsxFile(file, onGetProducts);

    const handleChange = useCallback(e => setFile(e.target.files[0]), []);

    const handleOpenUpload = useCallback(() => input.current.click(), []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                style={{display: 'none'}}
                multiple
                type="file"
                ref={input}
                onChange={handleChange}
            />
            <ButtonGroup
                color="secondary"
                aria-label="outlined primary button group"
            >
                <Button onClick={handleOpenUpload}>Загрузить таблицу</Button>
                <Button onClick={handleTableData} disabled={!file}>Получить данные таблицы</Button>
            </ButtonGroup>
        </div>
    );
};

export default React.memo(UploadXlsx);
