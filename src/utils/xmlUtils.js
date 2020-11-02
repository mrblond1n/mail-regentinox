export const getValueFromItem = object => object && Object.values(object)[0];

export const getAddress = address => {
    const zipcode = address.zipcode ? address.zipcode + ', ' : '';
    const home = address.home ? 'д. ' + address.home + ', ' : '';
    const building = address.building ? address.building + ', ' : '';
    const flat = address.flat ? 'кв. ' + address.flat : '';
    const string = zipcode + home + building + flat;

    return string;
};

export const getItemValues = (content, products) => {
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

export const createObjectWithEditableItems = editableItems => {
    const objectEditableItems = {};

    editableItems.forEach(items => {
        items.forEach(item => (objectEditableItems[item.id] = item.count));
    });

    return objectEditableItems;
};

export const getInnerRowData = row => [
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
