// const errors = require('http-errors');

const mongoose = require('mongoose');
const { config } = require('../config/config');
const { Schema } = mongoose;

const booksSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Book id is required'],
    },
    pages: {
      type: Number,
      required: [true, 'Book pages is required'],
    },
    status: {
      type: String,
      enum: config.getBookStatus().all,
      default: config.getBookStatus().unread,
    },
  },
  { _id: false },
);

const resultsSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Result date is required'],
    },
    pointResult: {
      type: Number,
      required: [true, 'Point reading pages result is required'],
    },
  },
  { _id: false },
);

const trainingSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: [true, 'Start Date is required'],
    },
    deadlineDate: {
      type: Date,
      required: [true, 'Deadline Date is required'],
    },
    readedPages: {
      type: Number,
      required: [true],
    },
    totalPages: {
      type: Number,
      required: [true, 'Total pages is required'],
    },
    books: {
      type: [booksSchema],
      required: [true, 'Books list is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: config.getTrainingStatus().all,
      default: config.getTrainingStatus().active,
    },
    results: {
      type: [resultsSchema],
      required: [true, 'results is required'],
    },
  },
  { timestamps: true },
);

const populateOwner = function (...fieds) {
  return function () {
    this.populate('owner', fieds);
  };
};

trainingSchema.pre(
  ['find', 'findOne', 'findOneAndUpdate'],
  populateOwner('email'),
);

// https://mongoosejs.com/docs/schematypes.html#dates

// const schemaErrorHandlingMiddlware = (error, doc, next) => {
//   if (error.name === 'MongoServerError' && error.code === 11000) {
//     next(
//       new errors[409](
//         `User with email "${error.keyValue.email}" already exist`,
//       ),
//     );
//   } else {
//     next();
//   }
// };

// usersSchema.post(['save', 'findOneAndUpdate'], schemaErrorHandlingMiddlware);

exports.Training = mongoose.model('Training', trainingSchema, 'trainings');
