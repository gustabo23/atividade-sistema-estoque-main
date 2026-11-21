import { ModelStatic, Op } from 'sequelize';
import Fornecedor from '../database/models/Fornecedor.model';
import Produto from '../database/models/Produto.model';
import { ConflictError, NotFoundError } from '../errors/HttpError';
import { FornecedorValidation } from '../validations/FornecedorValidation';

export class FornecedorService {
  constructor(
    private _Fornecedor: ModelStatic<Fornecedor>,
    private _Produto: ModelStatic<Produto>,
    private _fornecedorValidation: FornecedorValidation,
  ) {}

  public async list(): Promise<Fornecedor[]> {
    return this._Fornecedor.findAll({ order: [['nome', 'ASC']] });
  }

  public async findById(id: unknown): Promise<Fornecedor> {
    const fornecedorId = this._fornecedorValidation.validateId(id);
    const fornecedor = await this._Fornecedor.findByPk(fornecedorId);
    if (!fornecedor) throw new NotFoundError('Fornecedor não encontrado');

    return fornecedor;
  }

  public async create(body: unknown): Promise<Fornecedor> {
    const data = this._fornecedorValidation.validateBody(body);
    await this.ensureCnpjAvailable(data.cnpj);

    return this._Fornecedor.create(data);
  }

  public async update(id: unknown, body: unknown): Promise<Fornecedor> {
    const data = this._fornecedorValidation.validateBody(body);
    const fornecedor = await this.findById(id);
    await this.ensureCnpjAvailable(data.cnpj, fornecedor.id);

    return fornecedor.update(data);
  }

  public async remove(id: unknown): Promise<void> {
    const fornecedor = await this.findById(id);

    const produtos = await this._Produto.count({ where: { fornecedorId: fornecedor.id } });
    if (produtos > 0) {
      throw new ConflictError(`Fornecedor possui ${produtos} produto(s) vinculado(s)`);
    }

    await fornecedor.destroy();
  }

  private async ensureCnpjAvailable(cnpj: string, ignoreId?: number): Promise<void> {
    const where = ignoreId === undefined ? { cnpj } : { cnpj, id: { [Op.ne]: ignoreId } };
    const existente = await this._Fornecedor.findOne({ where });
    if (existente) throw new ConflictError('CNPJ já cadastrado');
  }
}
