const getSum = require('../src/sum');

describe('Testing getting sum method:', () => {
    test('right sum', () => {
        expect(getSum(['1', '12'])).toEqual(13);
        expect(getSum(['34', '34'])).toEqual(68);
        expect(getSum(['0', '5'])).toEqual(5);
        expect(getSum(['13', '12'])).toEqual(25);
        expect(getSum(['45', '3'])).toEqual(48);
    });
});