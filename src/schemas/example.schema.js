const joi = require('joi');
const { checkObjectId } = require('../helpers');

const someObject = joi.object({
  field1: joi
    .string()
    .pattern(/^[a-zA-Z\s'’ʼ-]{3,30}$/)
    .required(),
  field2: joi.string().required(),
});

const id = joi.object({
  id: joi.string().custom(checkObjectId).required(),
});

exports.exampleSchema = { someObject, id };
