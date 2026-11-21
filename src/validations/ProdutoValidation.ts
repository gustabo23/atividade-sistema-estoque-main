import { Unidade, UNIDADES } from '../database/models/Produto.model';
import { BadRequestError } from '../errors/HttpError';
import {
  isNonNegativeInt,
  isPlainObject,
  isPositiveInt,
  parseOptionalText,
  parsePositiveInt,
  parseRequiredText,
} from './common';
import { ListProdutosFilters, ListProdutosInput, ProdutoData } from './interfaces/ProdutoInput';

const MAX_NOME = 120;
const MAX_CODIGO = 50;
const MAX_DESCRICAO = 1000;

const isEmpty = (value: unknown): boolean => value === undefined || value === '';

export class ProdutoValidation {
  public validateId(id: unknown): number {
    return parsePositiveInt(id, 'Produto inválido');
  }

  public validateListFilters({
    categoriaId,
    fornecedorId,
    ativo,
  }: ListProdutosInput): ListProdutosFilters {
    const filters: ListProdutosFilters = {};

    if (!isEmpty(categoriaId)) {
      filters.categoriaId = parsePositiveInt(categoriaId, 'Categoria inválida');
    }
    if (!isEmpty(fornecedorId)) {
      filters.fornecedorId = parsePositiveInt(fornecedorId, 'Fornecedor inválido');
    }
    if (!isEmpty(ativo)) filters.ativo = this.ativo(ativo);

    return filters;
  }

  public validateBody(body: unknown): ProdutoData {
    if (!isPlainObject(body)) throw new BadRequestError('Corpo da requisição inválido');

    return {
      nome: parseRequiredText(body.nome, MAX_NOME, 'nome'),
      codigo: parseRequiredText(body.codigo, MAX_CODIGO, 'codigo'),
      descricao: parseOptionalText(body.descricao, MAX_DESCRICAO, 'descricao'),
      unidade: this.unidade(body.unidade),
      categoriaId: this.foreignId(body.categoriaId, 'categoriaId'),
      fornecedorId: this.foreignId(body.fornecedorId, 'fornecedorId'),
      estoqueMinimo: this.estoqueMinimo(body.estoqueMinimo),
    };
  }

  public validateAtivo(body: unknown): boolean {
    if (!isPlainObject(body) || typeof body.ativo !== 'boolean') {
      throw new BadRequestError('Campo ativo deve ser true ou false');
    }

    return body.ativo;
  }

  private ativo(value: unknown): boolean {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new BadRequestError('Filtro ativo deve ser true ou false');
  }

  private unidade(value: unknown): Unidade {
    const unidade = UNIDADES.find((item) => item === value);
    if (!unidade) throw new BadRequestError(`Campo unidade deve ser: ${UNIDADES.join(', ')}`);

    return unidade;
  }

  private foreignId(value: unknown, field: string): number {
    if (!isPositiveInt(value)) throw new BadRequestError(`Campo ${field} inválido`);

    return value;
  }

  private estoqueMinimo(value: unknown): number {
    if (!isNonNegativeInt(value)) {
      throw new BadRequestError('Campo estoqueMinimo deve ser um inteiro maior ou igual a 0');
    }

    return value;
  }
}
