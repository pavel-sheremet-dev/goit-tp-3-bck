const joi = require('joi');

const book = joi.object({
  name: joi.string().min(1).max(50).required(),
  author: joi.string().min(1).max(50).required(),
  year: joi.number().min(1000).max(3999).required(),
  pages: joi.number().max(9999).required(),
});

const updateBook = joi.object({
  rating: joi.number().min(1).max(5).required(),
  review: joi.string().min(2).required(),
});

exports.bookSchema = { book, updateBook };
