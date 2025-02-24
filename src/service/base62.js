const BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(number) {
    if (number === 0) return BASE62_CHARS[0];
    let result = "";
    while (number > 0) {
        const remainder = number % 62;
        result = BASE62_CHARS[remainder] + result;
        number = Math.floor(number / 62);
    }
    return result;
}

export function decodeBase62(base62String) {
    let number = 0;
    for (let char of base62String) {
        const value = BASE62_CHARS.indexOf(char);
        number = number * 62 + value;
    }
    return number;
}