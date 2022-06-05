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

router.get('/active', authhorize(), ctrlWrapper(controller.getActiveTraining));

module.exports = router;
