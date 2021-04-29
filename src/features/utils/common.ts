export const insertAt = (originalString: string, position: number, string: string): string =>
    originalString.slice(0, position) + string + originalString.slice(position);

export const getDigits = (string: string): string | undefined => string.match(/(\d+)/g)?.join('');
