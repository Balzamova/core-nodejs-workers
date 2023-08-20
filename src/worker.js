const { workerData, parentPort } = require('worker_threads');
const service = require('./services/service');

const result = makeCall(workerData);
parentPort.postMessage(JSON.stringify(result));

function makeCall(data) {
    return service.start(data);
}