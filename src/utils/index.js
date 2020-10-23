import XLSX from 'sheetjs-style';
import {removeDuplicates} from './common';
import * as headers from '../constants/sheetHeadersLocale';
import {parserXmlToXlsx} from './parseFile';
import convert from 'xml-js';

/**
 * 
 * @param {file} file 
 * @param {function} onHandler 
 * парсинг данных из XLSX файла
 */ 
export const parserDataFromXlsxFile = (file, onHandler) => {
    var reader = new FileReader();
    const items = [];

    reader.onload = function () {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type: 'binary'});

        wb.SheetNames.forEach(sheetName => {
            var rowObj = XLSX.utils.sheet_to_row_object_array(
                wb.Sheets[sheetName]
            );
            var jsonObj = JSON.stringify(rowObj);

            JSON.parse(jsonObj).forEach(item => {
                if (typeof item[headers.INDEX] !== 'number') return;
                const code = Number(item[headers.CODE]) || '';
                const article = item[headers.ARTICLE] || '';
                const count = item[headers.COUNT]|| 0;
                const name = item[headers.NAME].trim()|| '';
                const price = item[headers.PRICE]|| 0;
                const netWeight = item[headers.NET_WEIGHT] || 0;
                const grossWeight = item[headers.GROSS_WEIGHT] || 0;

                items.push({code, article, count, name, price, netWeight, grossWeight});
            });
            onHandler(removeDuplicates(items));
        });
    };
    reader.readAsBinaryString(file);
};

export const readXlsxFile = function ({file, products, handleDecrementProducts}) {
    if (!file) return;
    var text = '';
    var reader = new FileReader();
    var onload = function (event) {
        text = reader.result;
        const json = convert.xml2json(text, {compact: true, spaces: 0});

        parserXmlToXlsx({json, products, handleDecrementProducts});
    };

    reader.onload = onload;
    reader.readAsText(file);
};
