import createExpressHandler from '../util/expressHandler';
import ApiError from '../util/apiError';
import ApiResponse from '../util/apiResponse';
import jwt from 'jsonwebtoken';

const verifyAccessToken = createExpressHandler(async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      res
        .status(401)
        .json(new ApiError(401, null, false, `No accessToken found.`));
      return;
    }

    jwt.verify(
      accessToken,
      String(process.env.ACCESS_TOKEN_SECRET),
      (err: any, decoded: any) => {
        if (err) {
          const { message } = err;
          res.status(403).json(new ApiError(403, err, false, message));
          return;
        }

        req.body.userName = decoded.userName;
      }
    );

    if (req.body.userName) {
      next();
    }

    return;
  } catch (error: any) {
    console.error('Failed to verify accessToken:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

export { verifyAccessToken };
