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
    const reader = new FileReader();
    const items = [];

    reader.onload = function () {
        const fileData = reader.result;
        const wb = XLSX.read(fileData, {type: 'binary'});

        wb.SheetNames.forEach(sheetName => {
            const rowObj = XLSX.utils.sheet_to_row_object_array(
                wb.Sheets[sheetName]
            );
            const jsonObj = JSON.stringify(rowObj);

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

export const readXlsxFile = function ({file, products, onUpdate}) {
    if (!file) return;
    let text = '';
    const reader = new FileReader();

    reader.onload = function () {
        text = reader.result;
        const json = convert.xml2json(text, {compact: true, spaces: 0});

        parserXmlToXlsx({json, products, onUpdate});
    };

    reader.readAsText(file);
};
