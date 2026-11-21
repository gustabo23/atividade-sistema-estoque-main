import { Request, Response } from 'express';
import { CategoriaService } from '../services/Categoria.service';

export class CategoriaController {
  constructor(private readonly _categoriaService: CategoriaService) {}

  public list = async (_req: Request, res: Response): Promise<void> => {
    const result = await this._categoriaService.list();
    res.status(200).json(result);
  };

  public findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._categoriaService.findById(req.params.id);
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const result = await this._categoriaService.create(req.body);
    res.status(201).json(result);
  };

  public update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._categoriaService.update(req.params.id, req.body);
    res.status(200).json(result);
  };

  public remove = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    await this._categoriaService.remove(req.params.id);
    res.sendStatus(204);
  };
}
