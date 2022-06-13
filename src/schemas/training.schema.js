const joi = require('joi');

const {
  checkObjectId,
  compareTrainingDates,
  startOfCurrentDate,
} = require('../helpers');

const books = joi.object({
  id: joi.string().custom(checkObjectId).required(),
  pages: joi.number().min(1).required(),
});

const training = joi.object({
  startDate: joi.date().custom(startOfCurrentDate).required(),
  deadlineDate: joi.date().custom(compareTrainingDates),
  books: joi.array().items(books),
});

const updateTraining = joi.object({
  date: joi.date().required(),
  pointResult: joi.number().min(1).required(),
});

exports.trainingsSchema = { training, updateTraining };
