export const removeDuplicates = items =>
    items.filter((item, index, self) =>
        index === self.findIndex(t => t.code === item.code && t.article === item.article)
    );

export const toNumber = value => {
    if (typeof value === 'number') return value;

    if (Number(value) === NaN) return 0;
    
};

/**
 * @param firstName - имя
 * @param lastName - фамилия
 * @param secondName - отчество
 * @return склеенную строку, где каждое слово начинается с большой буквы
 * */
export const getFullName = ({firstName = '', lastName = '', secondName = ''}) => {
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
