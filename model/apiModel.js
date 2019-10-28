const fs = require('fs');

exports.json = (callBack) => {
  fs.readFile('./endApi.json', 'utf8', (error, data) => {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};
