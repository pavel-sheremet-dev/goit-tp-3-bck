const { trainingsSerializes } = require('../serialize');
const { trainingsService: service } = require('../services');

const { serializeTraining } = trainingsSerializes;

const addTraining = async (req, res) => {
  const training = await service.addTraining({
    ...req.body,
    owner: req.user.id,
  });
  res.status(201).send(serializeTraining(training));
};

const getActiveTraining = async (req, res) => {
  const { id: owner } = req.user;
  const training = await service.getActiveTraining({ owner });
  res.status(200).send(serializeTraining(training));
};

const updateActiveTraining = async (req, res) => {
  const { id: owner } = req.user;
  const { pointResult, date } = req.body;
  const training = await service.updateActiveTraining({
    owner,
    pointResult,
    date,
  });
  res.status(201).send(serializeTraining(training));
};

const finishTraining = async (req, res) => {
  const { id: owner } = req.user;
  const training = await service.finishTraining({ owner });
  res.status(201).send(serializeTraining(training));
};

exports.trainingsController = {
  addTraining,
  getActiveTraining,
  updateActiveTraining,
  finishTraining,
};
