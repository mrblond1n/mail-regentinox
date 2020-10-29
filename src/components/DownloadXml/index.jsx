import {Button, ButtonGroup} from '@material-ui/core';
import React, {useCallback, useRef, useState} from 'react';
import {readXlsxFile} from '../../utils/';
import {makeStyles} from '@material-ui/core/styles';

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

const DownloadXml = ({products, onUpdate}) => {
    const [file, setFile] = useState(null);
    const input = useRef();

    const handleFileUpload = useCallback(e => setFile(e.target.files[0]), []);

    const handleFileDownload = useCallback(() => {
        if (file.type !== 'text/xml') return;
        readXlsxFile({file, products, onUpdate});
        setFile(null);
        input.current.value = null;
    }, [file]);

    const handleOpenUpload = useCallback(() => {
        input.current.click();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                accept="text/xml"
                style={{display: 'none'}}
                multiple
                type="file"
                ref={input}
                onChange={handleFileUpload}
            />
            <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
            >
                <Button onClick={handleOpenUpload}>Загрузить XLSX</Button>
                <Button onClick={handleFileDownload} disabled={!file}>Выгрузить XML</Button>
            </ButtonGroup>
        </div>
    );
};

export default React.memo(DownloadXml);
