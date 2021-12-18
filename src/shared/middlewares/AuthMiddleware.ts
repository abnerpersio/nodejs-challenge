import { NextFunction, Request, Response } from 'express';
import { UNPROTECTED_ROUTES } from '../constants/unprotected-routes';

import ResponseError from '../errors/ResponseError';
import { decodeToken } from '../utils/jwt';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if (UNPROTECTED_ROUTES.find((item) => item.method === req.method && item.path === req.path)) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || typeof authorization !== 'string') {
    throw new ResponseError('Credentials are missing', 401);
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new ResponseError('Invalid token', 401);
  }

  try {
    const data = decodeToken(token);

    if (!data) {
      throw new ResponseError('Invalid token', 401);
    }

    req.auth = data;

    return next();
  } catch (error) {
    throw new ResponseError('Invalid token error', 401);
  }
}
