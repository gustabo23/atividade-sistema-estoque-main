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

class Categoria extends Model<InferAttributes<Categoria>, InferCreationAttributes<Categoria>> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare descricao: CreationOptional<string | null>;

  declare produtos?: NonAttribute<Produto[]>;
}

Categoria.init(
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
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'categorias',
    timestamps: false,
  },
);

export default Categoria;
