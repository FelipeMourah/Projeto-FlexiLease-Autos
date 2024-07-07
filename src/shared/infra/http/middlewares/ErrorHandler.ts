/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.code).json({
      code: err.code,
      status: err.status,
      message: err.message,
      details: err.details || [],
    });
  }

  console.error(err); // Log do erro para depuração
  return res.status(500).json({
    code: 500,
    status: 'Internal Server Error',
    message: 'Ocorreu um erro inesperado.',
    details: [],
  });
}

export default errorHandler;
