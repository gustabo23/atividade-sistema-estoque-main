import Categoria from './Categoria.model';
import Fornecedor from './Fornecedor.model';
import Movimentacao from './Movimentacao.model';
import Produto from './Produto.model';

export function setupAssociations(): void {
  Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
  Categoria.hasMany(Produto, { foreignKey: 'categoriaId', as: 'produtos' });

  Produto.belongsTo(Fornecedor, { foreignKey: 'fornecedorId', as: 'fornecedor' });
  Fornecedor.hasMany(Produto, { foreignKey: 'fornecedorId', as: 'produtos' });

  Movimentacao.belongsTo(Produto, { foreignKey: 'produtoId', as: 'produto' });
  Produto.hasMany(Movimentacao, { foreignKey: 'produtoId', as: 'movimentacoes' });
}
