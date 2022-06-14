const { config } = require('../config/config');
const { filter } = require('../helpers');

const { Book } = require('../models');
const { NotFound, Conflict } = require('http-errors');

const addBook = async reqParams => {
  const { name, owner } = reqParams;
  if (await Book.findOne({ name, owner })) {
    throw new Conflict('Book has already');
  }
  const book = await Book.create(reqParams);
  return book;
};

const getAllBooks = async params => {
  const { owner } = params;
  const data = await Book.find({ owner });
  if (!data.length) {
    throw new NotFound('No books found');
  }
  const unread = filter(data, config.getBookStatus().unread);
  const reading = filter(data, config.getBookStatus().nowReading);
  const finished = filter(data, config.getBookStatus().finished);
  if (params.status) {
    return { unread };
  }
  return { unread, reading, finished };
};

const updateBook = async ({ id, owner, rating, review }) => {
  const book = Book.findOneAndUpdate(
    { _id: id, owner },
    { rating, review },
    { new: true },
  );

  if (!book) {
    throw new NotFound('No books found');
  }

  return book;
};

const changeBooksStatus = async (owner, bookIdsArray, status) =>
  await Book.find({
    owner,
    _id: { $in: bookIdsArray },
  }).updateMany({ status });

const getBookIdsByStatus = (books, status) =>
  books.reduce(
    (acc, book) => (book.status === status ? [...acc, book._id] : acc),
    [],
  );

exports.booksService = {
  addBook,
  getAllBooks,
  updateBook,
  changeBooksStatus,
  getBookIdsByStatus,
};
