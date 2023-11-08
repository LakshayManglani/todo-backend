import { Router } from 'express';
import {
  changePasswordUserValidator,
  loginUserValidator,
  registerUserValidator,
  updateAvatarUserValidator,
} from '../validators/user.validator';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import {
  changeCurrentPassword,
  handleSocialLogin,
  loginUser,
  logoutUser,
  registerUser,
  updateUserAvatar,
} from '../controllers/user.controller';

function userRouter() {
  const router = Router();

  // Unsecured route
  router.route('/register').post(registerUserValidator, registerUser);

  router.route('/login').post(loginUserValidator, loginUser);

  // Secured routes
  router.route('/logout').post(verifyAccessToken, logoutUser);

  router
    .route('/avatar')
    .patch(verifyAccessToken, updateAvatarUserValidator, updateUserAvatar);

  router
    .route('/change-password')
    .post(
      verifyAccessToken,
      changePasswordUserValidator,
      changeCurrentPassword
    );

  // SSO routes
  router.route('/google').get();

  router.route('/github').get();

  router.route('/google/callback').get(handleSocialLogin);

  router.route('/github/callback').get(handleSocialLogin);

  return router;
}

export default userRouter;
