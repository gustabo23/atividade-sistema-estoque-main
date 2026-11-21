import { col, Includeable, ModelStatic, Op } from 'sequelize';
import Categoria from '../database/models/Categoria.model';
import Fornecedor from '../database/models/Fornecedor.model';
import Produto from '../database/models/Produto.model';
import { BadRequestError, ConflictError, NotFoundError } from '../errors/HttpError';
import { ProdutoValidation } from '../validations/ProdutoValidation';
import { ListProdutosInput, ProdutoData } from '../validations/interfaces/ProdutoInput';

const INCLUDE_RESUMO: Includeable[] = [
  { association: 'categoria', attributes: ['id', 'nome'] },
  { association: 'fornecedor', attributes: ['id', 'nome'] },
];

export class ProdutoService {
  constructor(
    private _Produto: ModelStatic<Produto>,
    private _Categoria: ModelStatic<Categoria>,
    private _Fornecedor: ModelStatic<Fornecedor>,
    private _produtoValidation: ProdutoValidation,
  ) {}

  public async list(query: ListProdutosInput): Promise<Produto[]> {
    const filters = this._produtoValidation.validateListFilters(query);

    return this._Produto.findAll({
      where: { ...filters },
      include: INCLUDE_RESUMO,
      order: [['nome', 'ASC']],
    });
  }

  public async listEstoqueBaixo(): Promise<Produto[]> {
    return this._Produto.findAll({
      where: { ativo: true, qntAtual: { [Op.lte]: col('Produto.estoque_minimo') } },
      include: INCLUDE_RESUMO,
      order: [['nome', 'ASC']],
    });
  }

  public async findById(id: unknown): Promise<Produto> {
    const produtoId = this._produtoValidation.validateId(id);
    return this.findWithRelations(produtoId);
  }

  public async create(body: unknown): Promise<Produto> {
    const data = this._produtoValidation.validateBody(body);
    await this.ensureReferencesExist(data);
    await this.ensureCodigoAvailable(data.codigo);

    const produto = await this._Produto.create(data);
    return this.findWithRelations(produto.id);
  }

  public async update(id: unknown, body: unknown): Promise<Produto> {
    const data = this._produtoValidation.validateBody(body);
    const produto = await this.findById(id);
    await this.ensureReferencesExist(data);
    await this.ensureCodigoAvailable(data.codigo, produto.id);

    await produto.update(data);
    return this.findWithRelations(produto.id);
  }

  public async updateAtivo(id: unknown, body: unknown): Promise<Produto> {
    const ativo = this._produtoValidation.validateAtivo(body);
    const produto = await this.findById(id);

    return produto.update({ ativo });
  }

  private async findWithRelations(id: number): Promise<Produto> {
    const produto = await this._Produto.findByPk(id, { include: ['categoria', 'fornecedor'] });
    if (!produto) throw new NotFoundError('Produto não encontrado');

    return produto;
  }

  private async ensureReferencesExist({ categoriaId, fornecedorId }: ProdutoData): Promise<void> {
    const [categoria, fornecedor] = await Promise.all([
      this._Categoria.findByPk(categoriaId),
      this._Fornecedor.findByPk(fornecedorId),
    ]);
    if (!categoria) throw new BadRequestError('Categoria informada não existe');
    if (!fornecedor) throw new BadRequestError('Fornecedor informado não existe');
  }

  private async ensureCodigoAvailable(codigo: string, ignoreId?: number): Promise<void> {
    const where = ignoreId === undefined ? { codigo } : { codigo, id: { [Op.ne]: ignoreId } };
    const existente = await this._Produto.findOne({ where });
    if (existente) throw new ConflictError('Código já cadastrado');
  }
}
