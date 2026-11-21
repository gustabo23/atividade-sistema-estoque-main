import { TipoMovimentacao } from '../../database/models/Movimentacao.model';

export interface ListMovimentacoesInput {
  produtoId?: unknown;
  tipo?: unknown;
  dataInicio?: unknown;
  dataFim?: unknown;
}

export interface ListMovimentacoesFilters {
  produtoId?: number;
  tipo?: TipoMovimentacao;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface MovimentacaoData {
  produtoId: number;
  tipo: TipoMovimentacao;
  quantidade: number;
  motivo: string;
}
