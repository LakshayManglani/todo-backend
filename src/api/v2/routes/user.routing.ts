import { Router } from 'express';
import passport from 'passport';
import google from 'passport-google-oauth20';
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
  passport.use(
    new google.Strategy(
      {
        clientID: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        callbackURL: 'http://localhost:5050/api/v2/users/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // Use the profile information (e.g., profile.id, profile.displayName) to create or log in the user.
        return done(null, profile);
      }
    )
  );

  // Serialize and deserialize user for sessions
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj: Express.User, done) => done(null, obj));

  router.route('/google').get(
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
    (req, res) => {
      res.send('redirecting to google...');
    }
  );

  router
    .route('/google/callback')
    .get(passport.authenticate('google'), handleSocialLogin);

  return router;
}

export default userRouter;
