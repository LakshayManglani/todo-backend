import createExpressHandler from '../util/expressHandler';
import ApiError from '../util/apiError';
import ApiResponse from '../util/apiResponse';
import {
  generateAccessToken,
  getByEmail,
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

    if (user.loginType != 'local') {
      res
        .status(400)
        .json(new ApiResponse(400, null, `Invalid login type.`, false));
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

const handleSocialLogin = createExpressHandler(async (req, res) => {
  try {
    const { name, displayName, emails, photos, provider } = req.user as {
      name: {
        familyName: string;
        givenName: string;
      };
      displayName: string;
      emails: [{ value: string; verified: boolean }];
      photos: [{ value: string }];
      provider: string;
    };

    const userName = displayName.toLowerCase().replace(' ', '');

    const user = await getByUsername(userName);

    if (user) {
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
        .json(
          new ApiResponse(200, userDto, 'User logged in successfully', true)
        );
      return;
    }

    const registerUser = await register(
      name.givenName,
      name.familyName,
      emails[0].value,
      userName,
      '',
      photos[0].value,
      'user',
      provider
    );

    const userDto = {
      id: registerUser.id,
      givenName: registerUser.givenName,
      familyName: registerUser.familyName,
      email: registerUser.email,
      userName: registerUser.userName,
      avatar: registerUser.avatar,
      role: registerUser.role,
    };

    const accessToken = await generateAccessToken(registerUser);

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

const loginUser = createExpressHandler(async (req, res) => {
  try {
    const { userName, password } = req.body as {
      userName: string;
      password: string;
    };

    const user = await getByUsername(userName);

    if (!user) {
      res
        .status(409)
        .json(
          new ApiResponse(
            409,
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

    let userExists = await getByUsername(userName);
    if (userExists) {
      res
        .status(409)
        .json(
          new ApiResponse(
            409,
            null,
            `User with username ${userName} already exists.`,
            false
          )
        );
      return;
    }

    userExists = await getByEmail(email);

    if (userExists) {
      res
        .status(409)
        .json(
          new ApiResponse(
            409,
            null,
            `User with email ${email} already exists.`,
            false
          )
        );
      return;
    }

    const user = await register(
      givenName,
      familyName,
      email,
      userName,
      password,
      avatar,
      role,
      'local'
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
