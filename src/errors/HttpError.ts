export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Requisição inválida') {
    super(400, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Recurso não encontrado') {
    super(404, message);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = 'Conflito') {
    super(409, message);
  }
}
