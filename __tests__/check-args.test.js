const checkArgs = require('../src/check-args');

describe('Testing check args method:', () => {
    test('the arguments are correct: both are numbers and not NaN', () => {
        expect(checkArgs(['1', '12'])).toEqual(true);
        expect(checkArgs(['34', '34'])).toEqual(true);
        expect(checkArgs(['0', '5'])).toEqual(true);
        expect(checkArgs(['13', '12'])).toEqual(true);
        expect(checkArgs(['34', '-34'])).toBe(true);
    });

    test('one or both of arguments are not nombers or NaN', () => {
        expect(checkArgs(['1', 'a'])).toBe(false);
        expect(checkArgs(['0', '!'])).toBe(false);
        expect(checkArgs(['13', '1a2'])).toBe(false);
        expect(checkArgs(['45', '3e'])).toBe(false);
        expect(checkArgs([NaN, 3])).toBe(false);
    });
});