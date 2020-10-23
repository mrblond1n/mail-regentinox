import XLSX from 'sheetjs-style';
import {
    fitToColumn,
    getNumberCellWithValue,
    setBold,
    setColor
} from './sheetStylesScripts';

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

const getValueFromItem = object => object && Object.values(object)[0];
const getAddress = address => {
    const zipcode = address.zipcode ? address.zipcode + ', ' : '';
    const home = address.home ? 'д. ' + address.home + ', ' : '';
    const building = address.building ? address.building + ', ' : '';
    const flat = address.flat ? 'кв. ' + address.flat : '';
    const string = zipcode + home + building + flat;

    return string;
};
const getFullName = client => {
    const lastName = client.lastName ? client.lastName + ' ' : '';
    const firstName = client.firstName ? client.firstName + ' ' : '';
    const secondName = client.secondName ? client.secondName : '';
    const string = `${lastName}${firstName}${secondName}`;

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
                countsInStorage = product.count;
                articles += `${product.article}; `;
                mass += product.netWeight;
            }
        });
        items.push({
            count: getValueFromItem(item.Count),
            id,
            countsInStorage
        });
    });

    return {articles, mass, message, count, orderSum, items};
};

// const changeItemCount = () => {}

export const parserXmlToXlsx = ({json, products, handleDecrementProducts}) => {
    const fileName = 'orders';

    Object.entries(JSON.parse(json).OrderList).forEach(([key, list]) => {
        const createXLSLFormatObj = [];
        const sheetRows = [];

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

                const items = itemsInfo.items;

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
                    items
                });
            });
        }
        createXLSLFormatObj.push(sheetHeaders);
        sheetRows.forEach(row => {
            const {
                addressString,
                articles,
                count,
                items,
                fullNameString,
                mailType,
                mass,
                message,
                orderDeliverySum,
                orderId,
                orderStatus,
                orderSum,
                payment
            } = row;
            const innerRowData = [
                addressString,
                fullNameString,
                mass,
                orderSum,
                payment,
                orderId,
                mailType,
                count,
                orderStatus,
                orderDeliverySum,
                message,
                articles
            ];

            handleDecrementProducts(items);
            createXLSLFormatObj.push(innerRowData);
        });
        if (sheetRows.length === 0) return;

        var ws_name = 'sheet';

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
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
