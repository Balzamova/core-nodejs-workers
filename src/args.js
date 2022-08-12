const { argv } = require('process');

module.exports = function getArguments() {
    return argv.slice(2);
}
