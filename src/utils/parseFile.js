import XLSX from 'sheetjs-style';
import {columns, headers} from '../constants/sheetHeadersLocale';
import {getFormattedDate} from './date';
import {
    fitToColumn,
    getNumberCellWithValue,
    setBold,
    setColor
} from './sheetStylesScripts';
import {
    createObjectWithEditableItems,
    getAddress,
    getFullName,
    getInnerRowData,
    getItemValues,
    getValueFromItem
} from './xmlUtils';

export const parserXmlToXlsx = ({json, products, onUpdate}) => {
    const date = getFormattedDate(new Date());
    const fileName = `${date}_orders`;

    Object.entries(JSON.parse(json).OrderList).forEach(([key, list]) => {
        const createXLSLFormatObj = [];
        const sheetRows = [];
        const editableItems = [];

        const orders = !list.length ? Array(list) : list;

        if (key === 'Order') {
            if (!orders.length) return;
            orders.forEach(order => {
                const clientRecivier = order.ClientReceiver;
                const content = Object.values(order.Content);
                const itemsInfo = Array.isArray(content[0])
                    ? getItemValues(content[0], products)
                    : getItemValues(content, products);

                // переменные для списка
                const articles = itemsInfo.articles;
                const orderId = getValueFromItem(order.ExtID);
                const payment = 0;
                const mass = itemsInfo.mass;
                const mailType = 23;
                const mobilePhone = getValueFromItem(clientRecivier.Address.m_phone);
                const orderStatus = getValueFromItem(order.OrderStatus);
                const orderDeliverySum = getValueFromItem(
                    order.OrderDeliverySum
                );
                const orderSum = itemsInfo.orderSum;
                const count = itemsInfo.count;
                const message = itemsInfo.message;
                const addressString = getAddress(clientRecivier.Address);
                const fullNameString = getFullName(clientRecivier);

                editableItems.push(itemsInfo.items);

                sheetRows.push({
                    articles,
                    payment,
                    orderId,
                    mass,
                    mailType,
                    mobilePhone,
                    orderStatus,
                    orderDeliverySum,
                    orderSum,
                    count,
                    message,
                    addressString,
                    fullNameString
                });
            });
        }
        createXLSLFormatObj.push(headers);
        sheetRows.forEach(row => {
            const innerRowData = getInnerRowData(row);

            createXLSLFormatObj.push(innerRowData);
        });
        onUpdate(createObjectWithEditableItems(editableItems));
        if (sheetRows.length === 0) return;

        var ws_name = 'sheet';

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

        columns.forEach(el => (ws[el].s = setBold()));
        ws['!cols'] = fitToColumn(createXLSLFormatObj);
        getNumberCellWithValue(createXLSLFormatObj, 'I').forEach(el =>
            setColor(ws[el])
        );

        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, fileName + '.xlsx');

        return sheetRows;
    });
};
