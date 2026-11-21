import { Request, Response } from 'express';
import { ProdutoService } from '../services/Produto.service';

export class ProdutoController {
  constructor(private readonly _produtoService: ProdutoService) {}

  public list = async (req: Request, res: Response): Promise<void> => {
    const { categoriaId, fornecedorId, ativo } = req.query;
    const result = await this._produtoService.list({ categoriaId, fornecedorId, ativo });
    res.status(200).json(result);
  };

  public listEstoqueBaixo = async (_req: Request, res: Response): Promise<void> => {
    const result = await this._produtoService.listEstoqueBaixo();
    res.status(200).json(result);
  };

  public findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._produtoService.findById(req.params.id);
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const result = await this._produtoService.create(req.body);
    res.status(201).json(result);
  };

  public update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._produtoService.update(req.params.id, req.body);
    res.status(200).json(result);
  };

  public updateAtivo = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._produtoService.updateAtivo(req.params.id, req.body);
    res.status(200).json(result);
  };
}
