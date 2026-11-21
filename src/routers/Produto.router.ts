import { Router } from 'express';
import { ProdutoController } from '../controllers/Produto.controller';
import { ProdutoService } from '../services/Produto.service';
import Categoria from '../database/models/Categoria.model';
import Fornecedor from '../database/models/Fornecedor.model';
import Produto from '../database/models/Produto.model';
import { ProdutoValidation } from '../validations/ProdutoValidation';

const produtoRouter = Router();

const produtoService = new ProdutoService(Produto, Categoria, Fornecedor, new ProdutoValidation());
const produtoController = new ProdutoController(produtoService);

produtoRouter.get('/produtos', produtoController.list);
produtoRouter.get('/produtos/estoque-baixo', produtoController.listEstoqueBaixo);
produtoRouter.get('/produtos/:id', produtoController.findById);
produtoRouter.post('/produtos', produtoController.create);
produtoRouter.put('/produtos/:id', produtoController.update);
produtoRouter.patch('/produtos/:id/ativo', produtoController.updateAtivo);

export default produtoRouter;
