const getArguments = require('./src/args');
const checkArgs = require('./src/check-args');
const getSum = require('./src/sum');

const args = getArguments();
const isValidArgs = checkArgs(args);
const result = isValidArgs 
    ? getSum(args)
    : 'One or more arguments are not valid numbers';

console.log(result);
