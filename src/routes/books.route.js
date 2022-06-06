const { Router } = require('express');
const { commonMiddlewares, usersMiddlewares } = require('../middlewares');
const { bookSchema: schema } = require('../schemas');
const { booksController: controller } = require('../controllers');

const { ctrlWrapper, validateRequest } = commonMiddlewares;
const { authhorize } = usersMiddlewares;

const router = Router();

router.post(
  '/',
  authhorize(),
  validateRequest(schema.book),
  ctrlWrapper(controller.addBook),
);

router.get('/', authhorize(), ctrlWrapper(controller.getBooks));

router.patch(
  '/:bookId',
  authhorize(),
  validateRequest(schema.updateBook),
  ctrlWrapper(controller.updateBook),
);

module.exports = router;
