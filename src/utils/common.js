export const removeDuplicates = items =>
    items.filter((item, index, self) =>
        index === self.findIndex(t => t.code === item.code && t.article === item.article)
    );
