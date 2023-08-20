const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./src/routes');

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(mainRouter);

app.listen(port, () => {
    console.log(`Server is listening on ${port} port`);
});

//==========

// const getArguments = require('./src/args');
// const checkArgs = require('./src/check-args');
// const getSum = require('./src/sum');

// const args = getArguments();
// const isValidArgs = checkArgs(args);
// const result = isValidArgs 
//     ? getSum(args)
//     : 'One or more arguments are not valid numbers';

// console.log(result);
