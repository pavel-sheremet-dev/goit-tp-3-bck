const { trainingsService: service } = require('../services');
// const { usersSerializes } = require('../serialize');

const addTraining = async (req, res) => {
  const training = await service.addTraining({
    ...req.body,
    owner: req.user.id,
  });
  res.status(201).send(training);
};

const getActiveTraining = async (req, res) => {
  const { id: owner } = req.user;
  const training = await service.getActiveTraining({ owner });
  res.status(200).send(training);
};

exports.trainingsController = {
  addTraining,
  getActiveTraining,
};
