export const isNumber = (number) => !/\D/.test(number);

export const isIntegerOrDouble = (number) => RegExp(/^[0-9]\d*(\.\d+)?$/).test(number);
