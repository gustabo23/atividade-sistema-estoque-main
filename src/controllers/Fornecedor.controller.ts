import { Request, Response } from 'express';
import { FornecedorService } from '../services/Fornecedor.service';

export class FornecedorController {
  constructor(private readonly _fornecedorService: FornecedorService) {}

  public list = async (_req: Request, res: Response): Promise<void> => {
    const result = await this._fornecedorService.list();
    res.status(200).json(result);
  };

  public findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._fornecedorService.findById(req.params.id);
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const result = await this._fornecedorService.create(req.body);
    res.status(201).json(result);
  };

  public update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._fornecedorService.update(req.params.id, req.body);
    res.status(200).json(result);
  };

  public remove = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    await this._fornecedorService.remove(req.params.id);
    res.sendStatus(204);
  };
}
