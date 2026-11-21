import { Unidade } from '../../database/models/Produto.model';

export interface ListProdutosInput {
  categoriaId?: unknown;
  fornecedorId?: unknown;
  ativo?: unknown;
}

export interface ListProdutosFilters {
  categoriaId?: number;
  fornecedorId?: number;
  ativo?: boolean;
}

export interface ProdutoData {
  nome: string;
  codigo: string;
  descricao: string | null;
  unidade: Unidade;
  categoriaId: number;
  fornecedorId: number;
  estoqueMinimo: number;
}
