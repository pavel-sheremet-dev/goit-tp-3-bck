const joi = require('joi');

const signup = joi.object({
  name: joi
    .string()
    .required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    // .pattern(/^[0-9a-zA-Z_\s'’ʼ-]{5,30}$/)
    .required(),
});

const signing = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    // .pattern(/^[0-9a-zA-Z_\s'’ʼ-]{5,30}$/)
    .required(),
});

const verify = joi.object({
  email: joi.string().email().required(),
});

exports.usersSchema = { signup, signing, verify };
