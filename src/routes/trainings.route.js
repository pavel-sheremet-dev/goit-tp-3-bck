const { Router } = require('express');

const { trainingsSchema: schema } = require('../schemas');
const { trainingsController: controller } = require('../controllers');
const { commonMiddlewares, usersMiddlewares } = require('../middlewares');

const { ctrlWrapper, validateRequest } = commonMiddlewares;
const { authhorize } = usersMiddlewares;

const router = Router();

router.post(
  '/',
  authhorize(),
  validateRequest(schema.training),
  ctrlWrapper(controller.addTraining),
);

router.get('/', authhorize(), ctrlWrapper(controller.getActiveTraining));

router.patch(
  '/',
  authhorize(),
  validateRequest(schema.updateTraining),
  ctrlWrapper(controller.updateActiveTraining),
);

router.patch('/finish', authhorize(), ctrlWrapper(controller.finishTraining));

module.exports = router;
