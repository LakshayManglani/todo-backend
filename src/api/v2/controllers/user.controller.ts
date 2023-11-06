import createExpressHandler from '../util/expressHandler';
import ApiError from '../util/apiError';
import ApiResponse from '../util/apiResponse';
import {
  generateAccessToken,
  getByUsername,
  isPasswordCorrect,
  register,
} from '../models/user.model';

const changeCurrentPassword = createExpressHandler(async (req, res) => {});

const forgotPasswordRequest = createExpressHandler(async (req, res) => {});

const handleSocialLogin = createExpressHandler(async (req, res) => {});

const loginUser = createExpressHandler(async (req, res) => {
  try {
    const { userName, password } = req.body as {
      userName: string;
      password: string;
    };

    const user = await getByUsername(userName);

    if (!user) {
      res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            `User with username ${userName} not found.`,
            true
          )
        );
      return;
    }

    const isPasswordValid = await isPasswordCorrect(userName, password);
    if (!isPasswordValid) {
      res
        .status(401)
        .json(
          new ApiResponse(401, null, `User password does not match.`, true)
        );
      return;
    }

    const userDto = {
      id: user.id,
      givenName: user.givenName,
      familyName: user.familyName,
      email: user.email,
      userName: user.userName,
      avatar: user.avatar,
      role: user.role,
    };

    const accessToken = await generateAccessToken(user);

    res
      .status(200)
      .cookie('accessToken', accessToken)
      .json(new ApiResponse(200, userDto, 'User logged in successfully', true));
  } catch (error: any) {
    console.error('Failed to login user:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

const logoutUser = createExpressHandler(async (req, res) => {
  try {
    const { userName } = req.body;

    const user = await getByUsername(userName);

    if (!user) {
      res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            `User with username ${userName} not found.`,
            true
          )
        );
      return;
    }

    const userDto = {
      id: user.id,
      givenName: user.givenName,
      familyName: user.familyName,
      email: user.email,
      userName: user.userName,
      avatar: user.avatar,
      role: user.role,
    };

    res
      .status(200)
      .clearCookie('accessToken')
      .json(
        new ApiResponse(200, userDto, 'User logeed out successfully', true)
      );
  } catch (error: any) {
    console.error('Failed to logout user:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

const resetForgottenPassword = createExpressHandler(async (req, res) => {});

const registerUser = createExpressHandler(async (req, res) => {
  try {
    const { givenName, familyName, email, userName, password, avatar, role } =
      req.body as {
        givenName: string;
        familyName: string;
        email: string;
        userName: string;
        password: string;
        avatar: string;
        role: string;
      };

    const user = await register(
      givenName,
      familyName,
      email,
      userName,
      password,
      avatar,
      role
    );

    const userDto = {
      id: user.id,
      givenName: user.givenName,
      familyName: user.familyName,
      email: user.email,
      userName: user.userName,
      avatar: user.avatar,
      role: user.role,
    };

    res
      .status(201)
      .json(
        new ApiResponse(201, userDto, 'User registered successfully', true)
      );
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
