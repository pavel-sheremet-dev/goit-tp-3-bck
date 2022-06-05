// const uuid = require('uuid').v4;

const { config } = require('../config/config');
const { Training } = require('../models');

const { NotFound } = require('http-errors');

const addTraining = async reqParams => {
  const totalPages = reqParams.books.reduce((acc, book) => acc + book.pages, 0);
  const training = await Training.create({
    ...reqParams,
    totalPages,
    readPages: 0,
  });
  return training;
};

const getActiveTraining = async ({ owner }) => {
  const training = await Training.findOne({
    status: config.getTrainingStatus().active,
    owner,
  });

  if (!training) throw new NotFound('Active training not Found');

  return training;
};

exports.trainingsService = {
  addTraining,
  getActiveTraining,
};
