import createExpressHandler from '../util/expressHandler';
import ApiError from '../util/apiError';
import ApiResponse from '../util/apiResponse';
import {
  generateAccessToken,
  getByUserId,
  getByUsername,
  isPasswordCorrect,
  register,
  updateAvatarById,
  updatePasswordById,
} from '../models/user.model';

const changeCurrentPassword = createExpressHandler(async (req, res) => {
  try {
    const { decodedUserName, oldPassword, newPassword, decodedUserId } =
      req.body as {
        decodedUserName: string;
        oldPassword: string;
        newPassword: string;
        decodedUserId: number;
      };

    const user = await getByUsername(decodedUserName);

    if (!user) {
      res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            `User with username ${decodedUserName} not found.`,
            false
          )
        );
      return;
    }

    const isValidPassword = await isPasswordCorrect(
      decodedUserName,
      oldPassword
    );
    if (!isValidPassword) {
      res
        .status(400)
        .json(new ApiResponse(400, null, `Invalid old Password.`, false));
      return;
    }

    await updatePasswordById(Number(decodedUserId), newPassword);

    res
      .status(200)
      .clearCookie('accessToken')
      .json(new ApiResponse(200, null, 'Password changed successfully', true));
  } catch (error: any) {
    console.error('Failed to change Password:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

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
            false
          )
        );
      return;
    }

    const isPasswordValid = await isPasswordCorrect(userName, password);
    if (!isPasswordValid) {
      res
        .status(401)
        .json(
          new ApiResponse(401, null, `User password does not match.`, false)
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
    const { decodedUserName } = req.body;

    const user = await getByUsername(decodedUserName);

    if (!user) {
      res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            `User with username ${decodedUserName} not found.`,
            false
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

const updateUserAvatar = createExpressHandler(async (req, res) => {
  try {
    const { decodedUserId, avatarUrl } = req.body as {
      decodedUserId: number;
      avatarUrl: string;
    };

    const user = await getByUserId(decodedUserId);

    if (!user) {
      res
        .status(404)
        .json(new ApiResponse(404, null, `User not found.`, false));
      return;
    }

    await updateAvatarById(decodedUserId, avatarUrl);

    res
      .status(200)
      .json(
        new ApiResponse(200, { avatarUrl }, 'Avatar changed successfully', true)
      );
  } catch (error: any) {
    console.error('Failed to change avatar:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

export {
  changeCurrentPassword,
  handleSocialLogin,
  loginUser,
  logoutUser,
  registerUser,
  updateUserAvatar,
};
