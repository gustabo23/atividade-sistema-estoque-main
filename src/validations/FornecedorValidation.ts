import { BadRequestError } from '../errors/HttpError';
import { isPlainObject, parsePositiveInt, parseRequiredText } from './common';
import { FornecedorData } from './interfaces/FornecedorInput';

const MAX_NOME = 120;
const MAX_TELEFONE = 20;
const MAX_EMAIL = 80;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class FornecedorValidation {
  public validateId(id: unknown): number {
    return parsePositiveInt(id, 'Fornecedor inválido');
  }

  public validateBody(body: unknown): FornecedorData {
    if (!isPlainObject(body)) throw new BadRequestError('Corpo da requisição inválido');

    return {
      nome: parseRequiredText(body.nome, MAX_NOME, 'nome'),
      cnpj: this.cnpj(body.cnpj),
      telefone: parseRequiredText(body.telefone, MAX_TELEFONE, 'telefone'),
      email: this.email(body.email),
    };
  }

  private cnpj(value: unknown): string {
    const digits = typeof value === 'string' ? value.replace(/\D/g, '') : '';
    if (digits.length !== 14) throw new BadRequestError('CNPJ deve ter 14 dígitos');

    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  private email(value: unknown): string {
    const email = parseRequiredText(value, MAX_EMAIL, 'email').toLowerCase();
    if (!EMAIL_REGEX.test(email)) throw new BadRequestError('Email inválido');

    return email;
  }
}
