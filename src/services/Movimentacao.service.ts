import { Includeable, ModelStatic, Op, Sequelize, WhereOptions } from 'sequelize';
import Movimentacao from '../database/models/Movimentacao.model';
import Produto from '../database/models/Produto.model';
import { BadRequestError, ConflictError, NotFoundError } from '../errors/HttpError';
import { MovimentacaoValidation } from '../validations/MovimentacaoValidation';
import {
  ListMovimentacoesFilters,
  ListMovimentacoesInput,
  MovimentacaoData,
} from '../validations/interfaces/MovimentacaoInput';

const INCLUDE_PRODUTO: Includeable = {
  association: 'produto',
  attributes: ['id', 'nome', 'codigo', 'unidade', 'qntAtual'],
};

export class MovimentacaoService {
  constructor(
    private _sequelize: Sequelize,
    private _Movimentacao: ModelStatic<Movimentacao>,
    private _Produto: ModelStatic<Produto>,
    private _movimentacaoValidation: MovimentacaoValidation,
  ) {}

  public async list(query: ListMovimentacoesInput): Promise<Movimentacao[]> {
    const filters = this._movimentacaoValidation.validateListFilters(query);

    return this._Movimentacao.findAll({
      where: this.buildWhere(filters),
      include: [INCLUDE_PRODUTO],
      order: [
        ['data', 'DESC'],
        ['id', 'DESC'],
      ],
    });
  }

  public async listByProduto(id: unknown): Promise<Movimentacao[]> {
    const produtoId = this._movimentacaoValidation.validateProdutoId(id);
    const produto = await this._Produto.findByPk(produtoId);
    if (!produto) throw new NotFoundError('Produto não encontrado');

    return this._Movimentacao.findAll({
      where: { produtoId },
      order: [
        ['data', 'DESC'],
        ['id', 'DESC'],
      ],
    });
  }

  public async findById(id: unknown): Promise<Movimentacao> {
    const movimentacaoId = this._movimentacaoValidation.validateId(id);
    return this.findWithProduto(movimentacaoId);
  }

  public async create(body: unknown): Promise<Movimentacao> {
    const data = this._movimentacaoValidation.validateBody(body);

    const movimentacao = await this._sequelize.transaction(async (transaction) => {
      const produto = await this._Produto.findByPk(data.produtoId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!produto) throw new BadRequestError('Produto informado não existe');
      if (!produto.ativo) throw new ConflictError('Produto inativo não pode ser movimentado');

      const novaQuantidade = this.calculateQuantidade(produto.qntAtual, data);
      await produto.update({ qntAtual: novaQuantidade }, { transaction });

      return this._Movimentacao.create(data, { transaction });
    });

    return this.findWithProduto(movimentacao.id);
  }

  private calculateQuantidade(atual: number, { tipo, quantidade }: MovimentacaoData): number {
    if (tipo === 'ENTRADA') return atual + quantidade;
    if (tipo === 'AJUSTE') return quantidade;

    if (quantidade > atual) {
      throw new ConflictError(
        `Estoque insuficiente: disponível ${atual}, solicitado ${quantidade}`,
      );
    }
    return atual - quantidade;
  }

  private buildWhere({
    produtoId,
    tipo,
    dataInicio,
    dataFim,
  }: ListMovimentacoesFilters): WhereOptions<Movimentacao> {
    const where: WhereOptions<Movimentacao> = {};
    if (produtoId !== undefined) where.produtoId = produtoId;
    if (tipo !== undefined) where.tipo = tipo;
    if (dataInicio || dataFim) {
      where.data = {
        ...(dataInicio && { [Op.gte]: dataInicio }),
        ...(dataFim && { [Op.lt]: dataFim }),
      };
    }

    return where;
  }

  private async findWithProduto(id: number): Promise<Movimentacao> {
    const movimentacao = await this._Movimentacao.findByPk(id, { include: [INCLUDE_PRODUTO] });
    if (!movimentacao) throw new NotFoundError('Movimentação não encontrada');

    return movimentacao;
  }
}
