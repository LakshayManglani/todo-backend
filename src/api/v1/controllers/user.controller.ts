import createExpressHandler from '../util/expressHandler';
import ApiError from '../util/apiError';
import ApiResponse from '../util/apiResponse';
import { register } from '../models/user.model';

const changeCurrentPassword = createExpressHandler(async (req, res) => {});

const forgotPasswordRequest = createExpressHandler(async (req, res) => {});

const handleSocialLogin = createExpressHandler(async (req, res) => {});

const loginUser = createExpressHandler(async (req, res) => {});

const logoutUser = createExpressHandler(async (req, res) => {});

const resetForgottenPassword = createExpressHandler(async (req, res) => {});

const registerUser = createExpressHandler(async (req, res) => {
  try {
    const { givenName, familyName, email, userName, password } = req.body as {
      givenName: string;
      familyName: string;
      email: string;
      userName: string;
      password: string;
    };

    const data = await register(
      givenName,
      familyName,
      email,
      userName,
      password
    );

    res
      .status(201)
      .json(new ApiResponse(201, data, 'User registered successfully', true));
  } catch (error: any) {
    console.error('Failed to register user:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

const updateUserAvatar = createExpressHandler(async (req, res) => {});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  handleSocialLogin,
  loginUser,
  logoutUser,
  resetForgottenPassword,
  registerUser,
  updateUserAvatar,
};
