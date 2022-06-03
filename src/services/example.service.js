const errors = require('http-errors');
const { ObjectModel: Object } = require('../models');

const getSomeObject = async someParams => {
  const someObject = Object.find();
  if (!someObject.length) throw new errors.NotFound('Some Object not found');
};

exports.exampleService = {
  getSomeObject,
};
