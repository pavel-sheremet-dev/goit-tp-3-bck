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
  const data = await Book.find(params.owner);
  if (!data.length) {
    throw new NotFound('No books found');
  }
  const unread = filter(data, 'unread');
  const reading = filter(data, 'nowReading');
  const finished = filter(data, 'finished');
  if (params.status) {
    return { unread };
  }
  return { unread, reading, finished };
};

const updateBook = async ({ id, owner, rating, review }) => {};

exports.booksService = {
  addBook,
  getAllBooks,
  updateBook,
};
