import { Request, Response } from 'express';
import { MovimentacaoService } from '../services/Movimentacao.service';

export class MovimentacaoController {
  constructor(private readonly _movimentacaoService: MovimentacaoService) {}

  public list = async (req: Request, res: Response): Promise<void> => {
    const { produtoId, tipo, dataInicio, dataFim } = req.query;
    const result = await this._movimentacaoService.list({ produtoId, tipo, dataInicio, dataFim });
    res.status(200).json(result);
  };

  public listByProduto = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._movimentacaoService.listByProduto(req.params.id);
    res.status(200).json(result);
  };

  public findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._movimentacaoService.findById(req.params.id);
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const result = await this._movimentacaoService.create(req.body);
    res.status(201).json(result);
  };
}
