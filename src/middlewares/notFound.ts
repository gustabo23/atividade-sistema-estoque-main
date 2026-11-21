import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/HttpError';

export const notFound = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError('Rota não encontrada'));
};
