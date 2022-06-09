const { Router } = require('express');

const { usersSchema: schema } = require('../schemas');
const { usersController: controller } = require('../controllers');
const { commonMiddlewares, usersMiddlewares } = require('../middlewares');

const { ctrlWrapper, validateRequest } = commonMiddlewares;
const { authhorize } = usersMiddlewares;

const router = Router();

router.post(
  '/signup',
  validateRequest(schema.signup),
  ctrlWrapper(controller.signUp),
);

router.get('/verify/:verificationToken', ctrlWrapper(controller.verifyUser));

router.post(
  '/verify',
  validateRequest(schema.verify),
  ctrlWrapper(controller.sendVerifyEmail),
);

router.post(
  '/login',
  validateRequest(schema.signing),
  ctrlWrapper(controller.signIn),
);

router.get('/logout', authhorize(), ctrlWrapper(controller.signOut));

router.get('/current', authhorize(), ctrlWrapper(controller.getCurrentUser));

router.get('/google', ctrlWrapper(controller.googleAuth));

router.get('/google-redirect', ctrlWrapper(controller.googleRedirect));

module.exports = router;
