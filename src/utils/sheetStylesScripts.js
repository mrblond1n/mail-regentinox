export const fitToColumn = arrayOfArray =>
    arrayOfArray[0].map((a, i) => ({
        wch: Math.max(...arrayOfArray.map(a2 => (a2[i]?.toString().length || 0) + 5))
    }));

export const getColor = count => {
    switch (count) {
        case 1:
            return '81C784'; // Зеленый
        case 2:
            return 'FFF59D'; // Желтый
        case 3:
            return '82B1FF'; // Синий
        case count >= 4:
            return 'EF5350'; // Красный
        default:
            return 'EF5350';
    }
};

export const setColor = cell =>
    (cell.s = {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {rgb: getColor(cell.v)},
            bgColor: {rgb: getColor(cell.v)}
        },
        border: {
            top: {style: 'thin', color: {auto: 1}},
            right: {style: 'thin', color: {auto: 1}},
            bottom: {style: 'thin', color: {auto: 1}},
            left: {style: 'thin', color: {auto: 1}}
        }
    });

export const getNumberCellWithValue = (arr, letter) =>
    Array.from(Array(arr.length - 1).keys()).map(
        (el, idx) => letter + (idx + 2)
    );

export const setBold = () => ({
    font: {
        bold: true
    }
});
