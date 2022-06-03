const errors = require('http-errors');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SomeObjectSchema = new Schema({
  fileld1: {
    type: String,
    required: [true, 'Set fileld1 for contact'],
  },
  fileld2: {
    type: String,
    required: [true, 'Set fileld2 for contact'],
    unique: true,
  },
});

const schemaErrorHandling = (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new errors[409](
        `Object with fileld2 "${error.keyValue.fileld2}" already exist`,
      ),
    );
  } else {
    next();
  }
};

SomeObjectSchema.post(['save', 'findOneAndUpdate'], schemaErrorHandling);

exports.ObjectModel = mongoose.model('Object', SomeObjectSchema, 'objects');
