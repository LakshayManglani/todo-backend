"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_validator_1 = require("../validators/user.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
function userRouter() {
    const router = (0, express_1.Router)();
    // Unsecured route
    router.route('/register').post(user_validator_1.registerUserValidator, user_controller_1.registerUser);
    router.route('/login').post(user_validator_1.loginUserValidator, user_controller_1.loginUser);
    // Secured routes
    router.route('/logout').post(auth_middleware_1.verifyAccessToken, user_controller_1.logoutUser);
    router
        .route('/avatar')
        .patch(auth_middleware_1.verifyAccessToken, user_validator_1.updateAvatarUserValidator, user_controller_1.updateUserAvatar);
    router
        .route('/change-password')
        .post(auth_middleware_1.verifyAccessToken, user_validator_1.changePasswordUserValidator, user_controller_1.changeCurrentPassword);
    // SSO routes
    passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
        clientID: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        callbackURL: String(process.env.GOOGLE_CALL_BACK_URL),
    }, (accessToken, refreshToken, profile, done) => {
        // Use the profile information (e.g., profile.id, profile.displayName) to create or log in the user.
        return done(null, profile);
    }));
    // Serialize and deserialize user for sessions
    passport_1.default.serializeUser((user, done) => done(null, user));
    passport_1.default.deserializeUser((obj, done) => done(null, obj));
    router.route('/google').get(passport_1.default.authenticate('google', {
        scope: ['profile', 'email'],
    }), (req, res) => {
        res.send('redirecting to google...');
    });
    router
        .route('/google/callback')
        .get(passport_1.default.authenticate('google'), user_controller_1.handleSocialLogin);
    return router;
}
exports.default = userRouter;
