import {getDigits, insertAt} from './common';

export const formatPhone = (number: string): string | null => {
    if (!number) return null;

    const digits = getDigits(number);

    if (!digits) return null;

    let phone = getCorrectPhoneNumber(digits);

    phone = insertAt(phone, 1, ' ');
    phone = insertAt(phone, 5, ' ');
    phone = insertAt(phone, 9, ' ');
    phone = insertAt(phone, 12, '-');

    return phone;
};

export const getCorrectPhoneNumber = (number: string): string => {
    switch (number.length) {
        case 11:
            return number.charAt(0) === '7' ? number : number.replace(/^\d/, '7');
        case 10:
            return `7${number}`;
        default:
            return 'incorrect phone';
    }
};
