import { BadRequestError } from '../errors/HttpError';
import { isPlainObject, parseOptionalText, parsePositiveInt, parseRequiredText } from './common';
import { CategoriaData } from './interfaces/CategoriaInput';

const MAX_NOME = 120;
const MAX_DESCRICAO = 255;

export class CategoriaValidation {
  public validateId(id: unknown): number {
    return parsePositiveInt(id, 'Categoria inválida');
  }

  public validateBody(body: unknown): CategoriaData {
    if (!isPlainObject(body)) throw new BadRequestError('Corpo da requisição inválido');

    return {
      nome: parseRequiredText(body.nome, MAX_NOME, 'nome'),
      descricao: parseOptionalText(body.descricao, MAX_DESCRICAO, 'descricao'),
    };
  }
}
