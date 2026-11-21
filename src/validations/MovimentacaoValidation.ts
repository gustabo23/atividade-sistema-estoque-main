import { TipoMovimentacao, TIPOS_MOVIMENTACAO } from '../database/models/Movimentacao.model';
import { BadRequestError } from '../errors/HttpError';
import {
  isNonNegativeInt,
  isPlainObject,
  isPositiveInt,
  parseDate,
  parsePositiveInt,
  parseRequiredText,
} from './common';
import {
  ListMovimentacoesFilters,
  ListMovimentacoesInput,
  MovimentacaoData,
} from './interfaces/MovimentacaoInput';

const MAX_MOTIVO = 500;
const FUSO_HORARIO = '-03:00';
const UM_DIA_MS = 24 * 60 * 60 * 1000;

const isEmpty = (value: unknown): boolean => value === undefined || value === '';

export class MovimentacaoValidation {
  public validateId(id: unknown): number {
    return parsePositiveInt(id, 'Movimentação inválida');
  }

  public validateProdutoId(id: unknown): number {
    return parsePositiveInt(id, 'Produto inválido');
  }

  public validateListFilters({
    produtoId,
    tipo,
    dataInicio,
    dataFim,
  }: ListMovimentacoesInput): ListMovimentacoesFilters {
    const filters: ListMovimentacoesFilters = {};

    if (!isEmpty(produtoId)) filters.produtoId = this.validateProdutoId(produtoId);
    if (!isEmpty(tipo))
      filters.tipo = this.tipo(typeof tipo === 'string' ? tipo.toUpperCase() : tipo);
    if (!isEmpty(dataInicio)) {
      filters.dataInicio = this.startOfDay(parseDate(dataInicio, 'dataInicio'));
    }
    if (!isEmpty(dataFim)) {
      const fim = this.startOfDay(parseDate(dataFim, 'dataFim'));
      filters.dataFim = new Date(fim.getTime() + UM_DIA_MS);
    }
    if (filters.dataInicio && filters.dataFim && filters.dataFim <= filters.dataInicio) {
      throw new BadRequestError('dataFim não pode ser anterior a dataInicio');
    }

    return filters;
  }

  public validateBody(body: unknown): MovimentacaoData {
    if (!isPlainObject(body)) throw new BadRequestError('Corpo da requisição inválido');

    if (!isPositiveInt(body.produtoId)) throw new BadRequestError('Campo produtoId inválido');
    const tipo = this.tipo(body.tipo);

    return {
      produtoId: body.produtoId,
      tipo,
      quantidade: this.quantidade(body.quantidade, tipo),
      motivo: parseRequiredText(body.motivo, MAX_MOTIVO, 'motivo'),
    };
  }

  private tipo(value: unknown): TipoMovimentacao {
    const tipo = TIPOS_MOVIMENTACAO.find((item) => item === value);
    if (!tipo) throw new BadRequestError(`Campo tipo deve ser: ${TIPOS_MOVIMENTACAO.join(', ')}`);

    return tipo;
  }

  private quantidade(value: unknown, tipo: TipoMovimentacao): number {
    if (tipo === 'AJUSTE') {
      if (!isNonNegativeInt(value)) {
        throw new BadRequestError('Campo quantidade deve ser um inteiro maior ou igual a 0');
      }
      return value;
    }

    if (!isPositiveInt(value)) {
      throw new BadRequestError('Campo quantidade deve ser um inteiro maior que 0');
    }
    return value;
  }

  private startOfDay(date: string): Date {
    return new Date(`${date}T00:00:00${FUSO_HORARIO}`);
  }
}
