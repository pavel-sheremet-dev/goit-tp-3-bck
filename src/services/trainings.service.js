// const uuid = require('uuid').v4;

const { config } = require('../config/config');
const { Training } = require('../models');

const { NotFound } = require('http-errors');

const addTraining = async reqParams => {
  const { startDate: date, books } = reqParams;

  const totalPages = books.reduce((acc, book) => acc + book.pages, 0);
  const training = await Training.create({
    ...reqParams,
    totalPages,
    readedPages: 0,
    results: [{ date, pointResult: 0 }],
  });
  return training;
};

const getActiveTraining = async ({ owner }) => {
  const status = config.getTrainingStatus().active;
  const training = await Training.findOne({ status, owner });

  if (!training) throw new NotFound('Active training not Found');

  return training;
};

const updateActiveTraining = async ({ owner, pointResult }) => {
  const status = config.getTrainingStatus().active;
  const training = await Training.findOne({ status, owner });

  if (!training) throw new NotFound('Active training not Found');

  const { books, totalPages, deadlineDate, results } = training;
  const readedPages = training.readedPages + pointResult;

  if (deadlineDate < new Date()) {
    const failedTraining = await failedTrainingFinish({
      deadlineDate,
      results,
      status,
      owner,
      readedPages,
    });
    return failedTraining;
  }

  results.push({ date: new Date(), pointResult });
  books.reduce((acc, book, id) => {
    switch (true) {
      case acc >= books[id].pages:
        books[id].status = config.getBookStatus().finished;
        return acc - books[id].pages;
      case acc < books[id].pages:
        return 0;
      default:
        return null;
    }
  }, readedPages);

  if (readedPages >= totalPages) {
    results.push({ date: deadlineDate, pointResult: 0 });

    const successDoneTraining = await Training.findOneAndUpdate(
      { status, owner },
      {
        readedPages: totalPages,
        status: config.getTrainingStatus().successDone,
        books,
        results,
      },
      { new: true },
    );
    return successDoneTraining;
  }

  const updatedTraining = Training.findOneAndUpdate(
    { status, owner },
    { readedPages, books, results },
    { new: true },
  );

  return updatedTraining;
};

const finishTraining = async ({ owner }) => {
  const status = config.getTrainingStatus().active;
  const training = await Training.findOne({ status, owner });

  if (!training) throw new NotFound('Active training not Found');

  const { results, deadlineDate, readedPages } = training;

  const failedTraining = await failedTrainingFinish({
    deadlineDate,
    results,
    status,
    owner,
    readedPages,
  });
  return failedTraining;
};

const failedTrainingFinish = async failedOptionts => {
  const { deadlineDate, results, status, owner, readedPages } = failedOptionts;
  console.log('tyt');
  results.push({ date: deadlineDate, pointResult: 0 });

  const failedTraining = await Training.findOneAndUpdate(
    { status, owner },
    { readedPages, status: config.getTrainingStatus().failed, results },
    { new: true },
  );
  return failedTraining;
};

exports.trainingsService = {
  addTraining,
  getActiveTraining,
  updateActiveTraining,
  finishTraining,
};
