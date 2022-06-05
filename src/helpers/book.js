const { config } = require('../config/config');

exports.filter = (data, filter) => {
  return data.filter(
    item => item.status === `${config.getBookStatus()}.${filter}`,
  );
};
