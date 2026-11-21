import { Router } from 'express';
import { MovimentacaoController } from '../controllers/Movimentacao.controller';
import { MovimentacaoService } from '../services/Movimentacao.service';
import sequelize from '../database/models';
import Movimentacao from '../database/models/Movimentacao.model';
import Produto from '../database/models/Produto.model';
import { MovimentacaoValidation } from '../validations/MovimentacaoValidation';

const movimentacaoRouter = Router();

const movimentacaoService = new MovimentacaoService(
  sequelize,
  Movimentacao,
  Produto,
  new MovimentacaoValidation(),
);
const movimentacaoController = new MovimentacaoController(movimentacaoService);

movimentacaoRouter.get('/movimentacoes', movimentacaoController.list);
movimentacaoRouter.get('/movimentacoes/:id', movimentacaoController.findById);
movimentacaoRouter.post('/movimentacoes', movimentacaoController.create);
movimentacaoRouter.get('/produtos/:id/movimentacoes', movimentacaoController.listByProduto);

export default movimentacaoRouter;
