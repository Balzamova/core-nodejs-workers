module.exports = function checkArgs(arr) {
    return arr.every(el => {
        if(
            typeof(+el) !== 'number'
            || Number.isNaN(+el)
        ) return false;

        return true;
    });
}