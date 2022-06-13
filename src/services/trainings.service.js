// const uuid = require('uuid').v4;

const { NotFound } = require('http-errors');
const { Training } = require('../models');
const { config } = require('../config/config');
const { finished, nowReading, unread } = config.getBookStatus();
const { booksService } = require('./books.service');
const { getStartDate } = require('../helpers');

const { changeBooksStatus, getBookIdsByStatus } = booksService;

const addTraining = async reqParams => {
  const { startDate: date, books, owner, deadlineDate: endDate } = reqParams;

  const totalPages = books.reduce((acc, book) => acc + book.pages, 0);
  const bookIds = books.map(book => book.id);

  const startDate = getStartDate(date);
  const deadlineDate = getStartDate(endDate, true);

  await changeBooksStatus(owner, bookIds, nowReading);

  const fields = { ...reqParams, books: bookIds, startDate, deadlineDate };

  const training = await Training.create({
    ...fields,
    totalPages,
    readedPages: 0,
    results: [{ date: startDate, pointResult: 0 }],
  });

  return training;
};

const getActiveTraining = async ({ owner }) => {
  const status = config.getTrainingStatus().active;
  const training = await Training.findOne({ status, owner });

  if (!training) throw new NotFound('Active training not Found');

  return training;
};

const updateActiveTraining = async ({ owner, pointResult, date }) => {
  const status = config.getTrainingStatus().active;
  const training = await Training.findOne({ status, owner });

  if (!training) throw new NotFound('Active training not Found');

  const { books, totalPages, deadlineDate, results } = training;
  const readedPages = training.readedPages + pointResult;

  results.push({ date, pointResult });

  const bookIds = [];

  books.reduce((acc, book, id) => {
    if (acc < books[id].pages) return acc - Infinity;
    if (books[id].status !== finished) {
      bookIds.push(books[id]._id);
      books[id].status = finished;
    }
    return acc - books[id].pages;
  }, readedPages);

  if (bookIds.length) {
    await changeBooksStatus(owner, bookIds, finished);
  }

  if (deadlineDate < date) {
    const bookIds = getBookIdsByStatus(books, nowReading);

    await changeBooksStatus(owner, bookIds, unread);

    const failedTraining = await failedTrainingFinish({
      deadlineDate,
      results,
      status,
      owner,
      readedPages: readedPages > totalPages ? totalPages : readedPages,
    });

    return failedTraining;
  }

  if (readedPages >= totalPages) {
    const successDoneTraining = await Training.findOneAndUpdate(
      { status, owner },
      {
        readedPages: totalPages,
        status: config.getTrainingStatus().successDone,
        results,
      },
      { new: true },
    );
    return successDoneTraining;
  }

  const updatedTraining = Training.findOneAndUpdate(
    { status, owner },
    { readedPages, results },
    { new: true },
  );

  return updatedTraining;
};

const failedTrainingFinish = async failedOptionts => {
  const { deadlineDate, results, status, owner, readedPages, pointResult } =
    failedOptionts;
  results.push({ date: deadlineDate, pointResult });

  const failedTraining = await Training.findOneAndUpdate(
    { status, owner },
    { readedPages, status: config.getTrainingStatus().failed, results },
    { new: true },
  );
  return failedTraining;
};

const finishTraining = async ({ owner, pointResult = 0 }) => {
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
    pointResult,
  });
  return failedTraining;
};

exports.trainingsService = {
  addTraining,
  getActiveTraining,
  updateActiveTraining,
  finishTraining,
};
