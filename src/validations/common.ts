import { BadRequestError } from '../errors/HttpError';

export function parsePositiveInt(value: unknown, message: string): number {
  const number = typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isInteger(number) || number <= 0) throw new BadRequestError(message);

  return number;
}

export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function parseRequiredText(value: unknown, max: number, field: string): string {
  const text = typeof value === 'string' ? value.trim() : '';
  if (text === '') throw new BadRequestError(`Campo ${field} é obrigatório`);
  if (text.length > max) throw new BadRequestError(`Campo ${field}: máximo de ${max} caracteres`);

  return text;
}

export function parseOptionalText(value: unknown, max: number, field: string): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') throw new BadRequestError(`Campo ${field} inválido`);

  const text = value.trim();
  if (text === '') return null;
  if (text.length > max) throw new BadRequestError(`Campo ${field}: máximo de ${max} caracteres`);

  return text;
}

export const isPositiveInt = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value > 0;

export const isNonNegativeInt = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0;

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function parseDate(value: unknown, field: string): string {
  const isValid =
    typeof value === 'string' &&
    DATE_REGEX.test(value) &&
    new Date(`${value}T00:00:00Z`).toISOString().startsWith(value);
  if (!isValid) throw new BadRequestError(`Campo ${field} deve estar no formato AAAA-MM-DD`);

  return value;
}
