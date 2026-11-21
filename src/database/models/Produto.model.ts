import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import sequelize from './index';
import type Categoria from './Categoria.model';
import type Fornecedor from './Fornecedor.model';
import type Movimentacao from './Movimentacao.model';

export const UNIDADES = ['un', 'kg', 'cx'] as const;
export type Unidade = (typeof UNIDADES)[number];

class Produto extends Model<InferAttributes<Produto>, InferCreationAttributes<Produto>> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare codigo: string;
  declare descricao: CreationOptional<string | null>;
  declare unidade: Unidade;
  declare categoriaId: number;
  declare fornecedorId: number;
  declare qntAtual: CreationOptional<number>;
  declare estoqueMinimo: number;
  declare ativo: CreationOptional<boolean>;

  declare categoria?: NonAttribute<Categoria>;
  declare fornecedor?: NonAttribute<Fornecedor>;
  declare movimentacoes?: NonAttribute<Movimentacao[]>;
}

Produto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    unidade: {
      type: DataTypes.ENUM(...UNIDADES),
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fornecedorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qntAtual: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    estoqueMinimo: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'produtos',
    timestamps: false,
  },
);

export default Produto;
