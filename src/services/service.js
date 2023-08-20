const uuid = require('uuid');

const dbService = require('./db-service');
let numberOfCalls = 0;

module.exports = {
  getData: function (req){
    const id = uuid.v4();
    const { url, method, schedule, repeat } = req.body;

    return {
      id,
      url,
      method,
      schedule,
      repeat
    };
  },

  getRepeatsData(data) {
    const { repeat } = data;
    return repeat.times === 1 ? null : repeat.times - 1;
  },

  updateRepeats: function(data) {
    const times = this.getRepeatsData(data);
    dbService.updateRepeatsDB(data.id, times);
  },

  startTimer: function(data, timer) {
    console.log(`Waiting for ${timer / 1000} sec`);

    setTimeout(() => {
      console.log('Run calls for data: ', data);
      this.makeCall(data);
    }, timer);
  },

  checkSchedule: function(data) {
    const schedule = new Date(data.schedule).getTime();
    const timeNow = new Date().getTime();
    const timer = schedule - timeNow;

    timer < 0 ? console.log('Time was gone') : this.startTimer(data, timer);
  },

  prepareNewCall: function(data, elem) {
    const { times, timeout } = elem.repeat;
    const newData = { 
      ...data, 
      repeat: {
        times,
        timeout,
      },
    };

    this.updateRepeats(newData);

    setTimeout(() => {
      this.makeCall(data);
    }, timeout);
  },

  checkRepeats: function(data) {
    const elem = dbService.getRepeatInfo(data.id);
    if (elem && elem.repeat) {
      this.prepareNewCall(data, elem);
    } else {
      console.log(`Finished. The result is: 
        ${JSON.stringify(dbService.getDbInfo(data.id))}
      `);
    }
  },

  makeCall: function(data) {
    const result = this.callFetch(data);
    dbService.updateDbWithResult(data, result);
    this.checkRepeats(data);
  },

  callFetch: function(data) {
    const { url, method } = data;
    ++numberOfCalls;

    // TODO
    console.log(`Make call #${numberOfCalls}: '${method}: ${url}`);
    
    // Getting call result
    const random = Math.round(Math.random() * 10);
    const result = random % 2 === 0 ? 'SUCCESS' : 'FAIL';
    console.log(`Call to: '${method}: ${url} finished with '${result}' result`);
    return result;
  },

  prepareRepeatsToSave: function(workerData) {
    const { id, repeat } = workerData;
    const times = repeat.times - 1;
    const repeatObj = {
      times,
      timeout: repeat.timeout,
    };
    dbService.saveRepeatsDB(id, repeatObj);
  },

  start: function (workerData) {
    dbService.saveDataToDb(workerData);

    if(workerData.repeat) {
      this.prepareRepeatsToSave(workerData);
    }

    this.checkSchedule(workerData);

    return workerData;
  },
};
