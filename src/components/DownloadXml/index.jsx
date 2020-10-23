import {Button} from '@material-ui/core'
import React, {useCallback, useState} from 'react'
import {readXlsxFile} from '../../utils/index'

const DownloadXml = ({products, onUpdate}) => {
    const [file, setFile] = useState(null)

    const handleFileUpload = useCallback(e => setFile(e.target.files[0]), []);

    const handleFileDownload = useCallback(() => {
        if (file.type !== 'text/xml') return

        console.log(readXlsxFile({file, products, handleDecrementProducts}))
    }, [file])

    const handleDecrementProducts = orderProducts => {
        orderProducts.forEach(({id, count, countsInStorage}) => {
            if (id) onUpdate({id, count: countsInStorage - count});
        })
    }

    return (
        <div>
            <input
                accept="text/xml"
                style={{display: 'none'}}
                id="uploadFile"
                multiple
                type="file"
                onChange={handleFileUpload}
            />
            <label htmlFor="uploadFile">
                <Button variant="outlined" component="span">
                    Загрузить XLSX
                </Button>
            </label>
            <Button variant="contained" onClick={handleFileDownload}>
                Выгрузить XML
            </Button>
        </div>
    )
}

export default React.memo(DownloadXml)
