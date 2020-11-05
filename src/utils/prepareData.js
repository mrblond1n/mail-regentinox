export const prepareProductForUpdate = (editableProducts, products) =>
    products
        .map(({id, count}) => ({id, count: count - editableProducts[id]}))
        .filter(({count}) => !!count);

