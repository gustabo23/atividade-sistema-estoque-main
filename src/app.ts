import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import categoriaRouter from './routers/Categoria.router';
import fornecedorRouter from './routers/Fornecedor.router';
import produtoRouter from './routers/Produto.router';
import movimentacaoRouter from './routers/Movimentacao.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandling();
  }

  private config(): void {
    this.app.use(
      cors({
        // Allowlist com comparação exata. Sem Origin (curl, Postman) não é CORS, então passa.
        origin: (origin, callback) => {
          callback(null, !origin || env.corsOrigins.includes(origin));
        },
        // DELETE: remover um bloqueio de data (DELETE /blocked-dates/:id).
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        maxAge: 600,
      }),
    );
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use(categoriaRouter);
    this.app.use(fornecedorRouter);
    this.app.use(produtoRouter);
    this.app.use(movimentacaoRouter);
  }

  private errorHandling(): void {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => console.log(`Running on port ${port}`));
  }
}

export { App };
