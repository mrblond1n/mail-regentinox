export const prepareProductForUpdate = (editableProducts, products) =>
    products.filter(({id, count}) =>
        editableProducts[id] && {id, count: count - editableProducts[id]}
    );
