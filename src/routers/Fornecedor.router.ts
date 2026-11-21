import { Router } from 'express';
import { FornecedorController } from '../controllers/Fornecedor.controller';
import { FornecedorService } from '../services/Fornecedor.service';
import Fornecedor from '../database/models/Fornecedor.model';
import Produto from '../database/models/Produto.model';
import { FornecedorValidation } from '../validations/FornecedorValidation';

const fornecedorRouter = Router();

const fornecedorService = new FornecedorService(Fornecedor, Produto, new FornecedorValidation());
const fornecedorController = new FornecedorController(fornecedorService);

fornecedorRouter.get('/fornecedores', fornecedorController.list);
fornecedorRouter.get('/fornecedores/:id', fornecedorController.findById);
fornecedorRouter.post('/fornecedores', fornecedorController.create);
fornecedorRouter.put('/fornecedores/:id', fornecedorController.update);
fornecedorRouter.delete('/fornecedores/:id', fornecedorController.remove);

export default fornecedorRouter;
