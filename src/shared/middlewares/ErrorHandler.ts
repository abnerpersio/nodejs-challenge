import { NextFunction, Request, Response } from 'express';
import ResponseError from '../errors/ResponseError';

export default function ErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;

  if (error instanceof ResponseError) {
    statusCode = error.code;
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message,
  });
}
