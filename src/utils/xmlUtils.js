export const createObjectWithEditableItems = editableItems => {
    const objectEditableItems = {};

    editableItems.forEach(items => {
        items.forEach(item => (objectEditableItems[item.id] = item.count));
    });

    return objectEditableItems;
};

export const getAddress = address => {
    const zipcode = getValueFromItem(address?.Zipcode) ? getValueFromItem(address?.Zipcode) + ', ' : '';
    const region = getValueFromItem(address?.Region) ? getValueFromItem(address?.Region) + ', ' : '';
    const city = getValueFromItem(address?.City) ? getValueFromItem(address?.City) + ', ' : '';
    const street = getValueFromItem(address?.Street) ? getValueFromItem(address?.Street) + ', ' : '';
    const home = getValueFromItem(address?.Home) ? 'д. ' + getValueFromItem(address?.Home) + ' ' : '';
    const building = getValueFromItem(address?.Building) ? 'стр. ' + getValueFromItem(address?.Building) + ' ' : '';
    const flat = getValueFromItem(address?.Flat) ? 'кв. ' + getValueFromItem(address?.Flat) : '';
    
    return zipcode + region + city + street + home + building + flat;
};

/**
 * @param firstName - имя
 * @param lastName - фамилия
 * @param secondName - отчество
 * @return склеенную строку, где каждое слово начинается с большой буквы
 * */
export const getFullName = client => {
    const lastName = getValueFromItem(client.LastName) || '';
    const firstName = getValueFromItem(client.FirstName) || '';
    const secondName = getValueFromItem(client.MiddleName) || '';
    const name = `${lastName} ${firstName} ${secondName}`;
    let capitalizeName = '';

    for (let i = 0; i < name.length; i++) {
        if (name[i - 1] === ' ' || i === 0) {
            capitalizeName += name[i].toUpperCase();
        } else {
            capitalizeName += name[i].toLowerCase();
        }
    }

    return capitalizeName;
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
            id
        });
    });

    return {articles, mass, message, count, orderSum, items};
};

export const getValueFromItem = object => object && Object.values(object)[0];
