import { NextFunction, Request, Response } from 'express';
import { DatabaseError, ForeignKeyConstraintError, UniqueConstraintError } from 'sequelize';
import { HttpError } from '../errors/HttpError';

interface ErrorResponse {
  status: number;
  message: string;
}

const bodyParserErrors = new Map<string, ErrorResponse>([
  ['entity.parse.failed', { status: 400, message: 'Corpo da requisição inválido' }],
  ['entity.too.large', { status: 413, message: 'Corpo da requisição muito grande' }],
]);

const getBodyParserError = (err: unknown): ErrorResponse | undefined => {
  if (typeof err !== 'object' || err === null || !('type' in err)) return undefined;
  return bodyParserErrors.get(String(err.type));
};

const LOCK_ERRORS = new Set(['ER_LOCK_DEADLOCK', 'ER_LOCK_WAIT_TIMEOUT']);
const isLockError = (err: unknown): boolean =>
  err instanceof DatabaseError && LOCK_ERRORS.has(String((err.parent as { code?: unknown }).code));

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const bodyParserError = getBodyParserError(err);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof UniqueConstraintError) {
    res.status(409).json({ message: 'Já existe um registro com esses dados' });
  } else if (err instanceof ForeignKeyConstraintError) {
    res.status(409).json({ message: 'Registro vinculado a outros dados' });
  } else if (isLockError(err)) {
    console.warn('Conflito de travas no banco (deadlock/timeout); requisição desfeita:', err);
    res.status(409).json({
      message: 'Outra operação mexia nos mesmos dados ao mesmo tempo. Tente de novo.',
    });
  } else if (bodyParserError) {
    res.status(bodyParserError.status).json({ message: bodyParserError.message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Erro interno' });
  }
};
