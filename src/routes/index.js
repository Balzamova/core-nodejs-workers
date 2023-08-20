const express = require('express');
const { Worker } = require('worker_threads');

const service = require('../services/service');

const router = express();
const workerPath = './src/worker.js';

router.post('/', async (req, res) => {
    const workerData = service.getData(req);
    const worker = new Worker(workerPath, { workerData });
  
    worker.on('message', (data) => {
        const result = JSON.parse(data);
        res.send({...result, workerId: worker.threadId });
    });
    worker.on('error', (err) => res.send(err));
  });

module.exports = router;