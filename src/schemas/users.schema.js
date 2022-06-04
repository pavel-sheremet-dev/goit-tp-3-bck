const joi = require('joi');

const signup = joi.object({
  name: joi
    .string()
    .pattern(/^[A-Za-zА-Яа-яґҐЁёІіЇїЄє'’ʼ\\s-]{3,30}$/)
    .required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[0-9a-zA-Z_\s'’ʼ-]{8,20}$/)
    .required(),
});

const signing = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[0-9a-zA-Z_\s'’ʼ-]{8,20}$/)
    .required(),
});

const verify = joi.object({
  email: joi.string().email().required(),
});

exports.usersSchema = { signup, signing, verify };
