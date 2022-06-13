const { isValidObjectId } = require('mongoose');
const { getStartDate } = require('./timeSevice');

exports.checkObjectId = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Contact not Found. Invalid ID');
  }
  return value;
};

exports.compareTrainingDates = (value, helpers) => {
  const startDate = helpers.state.ancestors[0].startDate;
  if (value - startDate < 24 * 60 * 60 * 1000) {
    return helpers.message('deadline Date must be greater or equal then 1 day');
  }
  return value;
};

exports.startOfCurrentDate = (value, helpers) => {
  const date = new Date();
  const minDate = getStartDate(date);

  if (value - minDate < 0) {
    return helpers.message(
      'start Date must be greater than start of current day',
    );
  }
  return value;
};
