import XLSX from 'sheetjs-style';
import {
    fitToColumn,
    getNumberCellWithValue,
    setBold,
    setColor
} from './sheetStylesScripts';

import {getFullName} from './common';

const sheetHeaders = [
    'ADDRESSLINE',
    'ADRESAT',
    'MASS',
    'VALUE',
    'PAYMENT',
    'COMMENT',
    'MAILTYPE',
    'COUNT',
    'ORDERSTATUS',
    'ДОСТАВКА',
    'ИНФОРМАЦИЯ',
    'АРТИКУЛЫ'
];

const headersCell = [
    'A1',
    'B1',
    'C1',
    'D1',
    'E1',
    'F1',
    'G1',
    'H1',
    'I1',
    'J1',
    'K1',
    'L1'
];

const getValueFromItem = object => object && Object.values(object)[0];
const getAddress = address => {
    const zipcode = address.zipcode ? address.zipcode + ', ' : '';
    const home = address.home ? 'д. ' + address.home + ', ' : '';
    const building = address.building ? address.building + ', ' : '';
    const flat = address.flat ? 'кв. ' + address.flat : '';
    const string = zipcode + home + building + flat;

    return string;
};

const getItemValues = (content, products) => {
    let message = '';
    let count = 0;
    let orderSum = 0;
    let mass = 0;
    let articles = '';
    const items = [];

    content.forEach(item => {
        message += `${getValueFromItem(item.GoodsCode)} - ${getValueFromItem(
            item.Count
        )}; `;
        count += Number(getValueFromItem(item.Count));
        orderSum += Number(getValueFromItem(item.PriceWithDiscount));
        let id = '';
        let countsInStorage = 0;

        products.forEach(product => {
            if (String(product.code) === getValueFromItem(item.GoodsCode)) {
                id = product.id;
                countsInStorage = Number(product.count);
                articles += `${product.article}; `;
                mass += Number(product.netWeight);
            }
        });
        items.push({
            count: Number(getValueFromItem(item.Count)),
            id,
        });
    });

    return {articles, mass, message, count, orderSum, items};
};

// const changeItemCount = () => {}

export const parserXmlToXlsx = ({json, products, onUpdate}) => {
    const fileName = 'orders';

    Object.entries(JSON.parse(json).OrderList).forEach(([key, list]) => {
        const createXLSLFormatObj = [];
        const sheetRows = [];
        const editableItems = [];

        if (key === 'Order') {
            if (!list.length) return;
            list.forEach(order => {
                const clientRecivier = order.ClientReceiver;
                const content = Object.values(order.Content);
                const itemsInfo = Array.isArray(content[0])
                    ? getItemValues(content[0], products)
                    : getItemValues(content, products);

                const lastName = getValueFromItem(clientRecivier.LastName);
                const firstName = getValueFromItem(clientRecivier.FirstName);
                const secondName = getValueFromItem(clientRecivier.MiddleName);
                const address = clientRecivier.Address;
                const zipcode = getValueFromItem(address.Zipcode);
                const home = getValueFromItem(address.Home);
                const building = getValueFromItem(address.Building);
                const flat = getValueFromItem(address.Flat);

                // переменные для списка
                const articles = itemsInfo.articles;
                const orderId = getValueFromItem(order.ExtID);
                const payment = 0;
                const mass = itemsInfo.mass;
                const mailType = 23;
                const orderStatus = getValueFromItem(order.OrderStatus);
                const orderDeliverySum = getValueFromItem(
                    order.OrderDeliverySum
                );
                const orderSum = itemsInfo.orderSum;
                const count = itemsInfo.count;
                const message = itemsInfo.message;
                const addressString = getAddress({
                    zipcode,
                    home,
                    building,
                    flat
                });
                const fullNameString = getFullName({
                    firstName,
                    lastName,
                    secondName
                });

                editableItems.push(itemsInfo.items);

                sheetRows.push({
                    articles,
                    payment,
                    orderId,
                    mass,
                    mailType,
                    orderStatus,
                    orderDeliverySum,
                    orderSum,
                    count,
                    message,
                    addressString,
                    fullNameString,
                });
            });
        }
        createXLSLFormatObj.push(sheetHeaders);
        sheetRows.forEach(row => {
            const innerRowData = getInnerRowData(row);

            createXLSLFormatObj.push(innerRowData);
        });
        onUpdate(createObjectWithEditableItems(editableItems));
        if (sheetRows.length === 0) return;

        var ws_name = 'sheet';

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
        

        headersCell.forEach(el => (ws[el].s = setBold()));
        ws['!cols'] = fitToColumn(createXLSLFormatObj);
        getNumberCellWithValue(createXLSLFormatObj, 'H').forEach(el =>
            setColor(ws[el])
        );

        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, fileName + '.xlsx');
        
        return sheetRows;
    });
};

const createObjectWithEditableItems = editableItems => {
    const objectEditableItems = {};

    editableItems.forEach(items => {
        items.forEach(item => (objectEditableItems[item.id] = item.count));
    });

    return objectEditableItems;
};

const getInnerRowData = row => [
    row?.addressString,
    row?.fullNameString,
    row?.mass,
    row?.orderSum,
    row?.payment,
    row?.orderId,
    row?.mailType,
    row?.count,
    row?.orderStatus,
    row?.orderDeliverySum,
    row?.message,
    row?.articles
];
