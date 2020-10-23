import {Button} from '@material-ui/core'
import React, {useState} from 'react'
import {parserDataFromXlsxFile} from '../../utils'

const UploadXlsx = ({onGetProducts}) => {
    const [file, setFile] = useState(null)
    const handleChange = e => setFile(e.target.files[0])
    const handleTableData = () => parserDataFromXlsxFile(file, onGetProducts);

    return (
        <div>
            <input
                // accept="text/xml"
                style={{display: 'none'}}
                id="uploadFile"
                multiple
                type="file"
                onChange={handleChange}
            />
            <label htmlFor="uploadFile">
                <Button variant="outlined" component="span">
                    Загрузить таблицу
                </Button>
            </label>
            <Button variant="contained" onClick={handleTableData}>
                Получить данные таблицы
            </Button>
        </div>
    )
}

export default React.memo(UploadXlsx)
