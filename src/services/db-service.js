const db = require('../db/db');
const repeatDb = require('../db/repeat-db');

module.exports = {
  saveDataToDb: function (data) {
    return db.push(data);
  },

  updateDbWithResult: function (data, result) {
    db.map((elem) => {
      if (elem.id === data.id) {
        if (elem.result) {
          elem.result.push(result);
        } else {
          elem.result = [result];
        }
      }
    });
  },

  getDbInfo: (id) => {
    return db.filter(el => el.id === id)[0];
  },

  saveRepeatsDB: function (id, repeat) {
    repeatDb.push({
      id,
      repeat,
    });
  },

  updateRepeatsDB: function (id, times) {
    repeatDb.map((elem) => {
      if (elem.id === id) {
        times ? (elem.repeat.times = times) : (elem.repeat = null);
      }
    });
  },

  getRepeatInfo: (id) => {
    return repeatDb.filter(el => el.id === id)[0];
  }
};
