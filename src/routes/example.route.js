const { Router } = require('express');
const { exampleController: controller } = require('../controllers');
const { commonMiddlewares } = require('../middlewares');
const { exampleSchema: schema } = require('../schemas');

const { validateRequest, ctrlWrapper } = commonMiddlewares;

const router = Router();

router.get(
  '/examplePath',
  validateRequest(schema.someObject),
  ctrlWrapper(controller.getSomeObject),
);

module.exports = router;
