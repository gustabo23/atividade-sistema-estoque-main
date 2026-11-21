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

export const TIPOS_MOVIMENTACAO = ['ENTRADA', 'SAIDA', 'AJUSTE'] as const;
export type TipoMovimentacao = (typeof TIPOS_MOVIMENTACAO)[number];

class Movimentacao extends Model<
  InferAttributes<Movimentacao>,
  InferCreationAttributes<Movimentacao>
> {
  declare id: CreationOptional<number>;
  declare produtoId: number;
  declare tipo: TipoMovimentacao;
  declare quantidade: number;
  declare motivo: string;
  declare data: CreationOptional<Date>;

  declare produto?: NonAttribute<Produto>;
}

Movimentacao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM(...TIPOS_MOVIMENTACAO),
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'movimentacao',
    timestamps: false,
  },
);

export default Movimentacao;
