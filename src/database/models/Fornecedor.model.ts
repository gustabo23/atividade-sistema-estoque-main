import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import sequelize from './index';
import type Produto from './Produto.model';

class Fornecedor extends Model<InferAttributes<Fornecedor>, InferCreationAttributes<Fornecedor>> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare cnpj: string;
  declare telefone: string;
  declare email: string;

  declare produtos?: NonAttribute<Produto[]>;
}

Fornecedor.init(
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
    cnpj: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'fornecedores',
    timestamps: false,
  },
);

export default Fornecedor;
