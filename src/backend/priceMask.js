/**
 * Маска ввода чисел вплоть до миллиардов (1 000 000 000 000)
 * @param value
 * @return {string}
 */
export function priceMask(value) {
    let c = value;
    c = c.split(' ');
    c = c.join('');
    let l = c.length;
    if (l === 4) {
        c = c.slice(0, 1) + ' ' + c.slice(1);
    } else if (l === 5) {
        c = c.slice(0, 2) + ' ' + c.slice(2);
    } else if (l === 6) {
        c = c.slice(0, 3) + ' ' + c.slice(3);
    } else if (l === 7) {
        c = c.slice(0, 1) + ' ' + c.slice(1, 4) + ' ' + c.slice(4);
    } else if (l === 8) {
        c = c.slice(0, 2) + ' ' + c.slice(2, 5) + ' ' + c.slice(5);
    } else if (l === 9) {
        c = c.slice(0, 3) + ' ' + c.slice(3, 6) + ' ' + c.slice(6);
    } else if (l === 10) {
        c = c.slice(0, 1) + ' ' + c.slice(1, 4) + ' ' + c.slice(4, 7) + ' ' + c.slice(7, 10);
    } else if (l === 11) {
        c = c.slice(0, 2) + ' ' + c.slice(2, 5) + ' ' + c.slice(5, 8) + ' ' + c.slice(8, 11);
    } else if (l === 12) {
        c = c.slice(0, 3) + ' ' + c.slice(3, 6) + ' ' + c.slice(6, 9) + ' ' + c.slice(9, 12);
    } else if (l === 13) {
        c = c.slice(0, 1) + ' ' + c.slice(1, 4) + ' ' + c.slice(4, 7) + ' ' + c.slice(7, 10) + ' ' + c.slice(10);
    }
    return c;
}