const mongoose = require('mongoose');
const { config } = require('../config/config');
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 50,
      required: [true, 'Name book is required'],
    },
    author: {
      type: String,
      minlength: 1,
      maxlength: 50,
      required: [true, 'Author book is required'],
    },
    year: {
      type: Number,
      min: 1000,
      max: 3999,
      required: [true, 'Year book is required'],
    },
    pages: {
      type: Number,
      max: 9999,
      required: [true, 'Amount pages book is required'],
    },
    status: {
      type: String,
      enum: config.getBookStatus().all,
      default: config.getBookStatus().unread,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    review: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const populateOwner = function (...fieds) {
  return function () {
    this.populate('owner', fieds);
  };
};

bookSchema.pre(['find', 'findOne', 'findOneAndUpdate'], populateOwner('email'));

exports.Book = mongoose.model('Book', bookSchema, 'books');
