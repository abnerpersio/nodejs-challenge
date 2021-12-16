import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UNPROTECTED_ROUTES } from '../constants/unprotected-routes';

import ResponseError from '../errors/ResponseError';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  if (UNPROTECTED_ROUTES.includes(req.path)) {
    next();
  }

  const { authorization } = req.headers;

  if (!authorization || typeof authorization !== 'string') {
    throw new ResponseError('Credentials are missing', 401);
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    throw new ResponseError('Invalid token', 401);
  }

  try {
    const data = jwt.decode(token);
    if (!data) {
      throw new ResponseError('Invalid token', 401);
    }

    req.auth = data;

    next();
  } catch (error) {
    throw new ResponseError('Invalid token error', 401);
  }
}
