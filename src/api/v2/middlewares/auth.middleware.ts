import createExpressHandler from '../util/expressHandler';
import ApiError from '../util/apiError';
import ApiResponse from '../util/apiResponse';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyAccessToken = createExpressHandler(async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      res
        .status(401)
        .json(new ApiResponse(401, null, `No accessToken found.`, true));
      return;
    }

    const decodedToken = jwt.verify(
      accessToken,
      String(process.env.ACCESS_TOKEN_SECRET)
    ) as JwtPayload;

    req.body.userName = decodedToken.userName;

    next();
  } catch (error: any) {
    console.error('Failed to verify accessToken:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

export { verifyAccessToken };
