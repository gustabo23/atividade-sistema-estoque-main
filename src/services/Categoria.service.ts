import { ModelStatic } from 'sequelize';
import Categoria from '../database/models/Categoria.model';
import Produto from '../database/models/Produto.model';
import { ConflictError, NotFoundError } from '../errors/HttpError';
import { CategoriaValidation } from '../validations/CategoriaValidation';

export class CategoriaService {
  constructor(
    private _Categoria: ModelStatic<Categoria>,
    private _Produto: ModelStatic<Produto>,
    private _categoriaValidation: CategoriaValidation,
  ) {}

  public async list(): Promise<Categoria[]> {
    return this._Categoria.findAll({ order: [['nome', 'ASC']] });
  }

  public async findById(id: unknown): Promise<Categoria> {
    const categoriaId = this._categoriaValidation.validateId(id);
    const categoria = await this._Categoria.findByPk(categoriaId);
    if (!categoria) throw new NotFoundError('Categoria não encontrada');

    return categoria;
  }

  public async create(body: unknown): Promise<Categoria> {
    const data = this._categoriaValidation.validateBody(body);
    return this._Categoria.create(data);
  }

  public async update(id: unknown, body: unknown): Promise<Categoria> {
    const data = this._categoriaValidation.validateBody(body);
    const categoria = await this.findById(id);

    return categoria.update(data);
  }

  public async remove(id: unknown): Promise<void> {
    const categoria = await this.findById(id);

    const produtos = await this._Produto.count({ where: { categoriaId: categoria.id } });
    if (produtos > 0) {
      throw new ConflictError(`Categoria possui ${produtos} produto(s) vinculado(s)`);
    }

    await categoria.destroy();
  }
}
