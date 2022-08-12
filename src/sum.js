module.exports = function getSum(arr) {
    return arr.reduce((acc, cur) => {
        acc += Number(cur);
        return acc;
    }, 0);
}