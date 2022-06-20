const joi = require('joi');

const signup = joi.object({
  name: joi
    .string()
    .pattern(/[A-Za-zА-Яа-яґҐЁёІіЇїЄє'’ʼ\s-]{3,30}/)
    .required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const signing = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const verify = joi.object({
  email: joi.string().email().required(),
});

exports.usersSchema = { signup, signing, verify };
