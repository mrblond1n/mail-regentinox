export const removeDuplicates = items =>
    items.filter((item, index, self) =>
        index === self.findIndex(t => t.code === item.code && t.article === item.article)
    );

export const toNumber = value => {
    if (typeof value === 'number') return value;

    if (Number(value) === NaN) return 0;
    
};
