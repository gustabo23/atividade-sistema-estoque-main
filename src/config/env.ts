// Lê e valida as variáveis de ambiente em um único lugar.
// Importe este arquivo só depois de 'dotenv/config' (veja server.ts).

const parseList = (value = ''): string[] =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const corsOrigins = parseList(process.env.CORS_ORIGIN);

if (process.env.NODE_ENV === 'production' && corsOrigins.length === 0) {
  throw new Error('CORS_ORIGIN é obrigatório em produção');
}

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente ${name} é obrigatória`);
  return value;
};

export const env = {
  port: Number(process.env.APP_PORT) || 3001,
  corsOrigins,
  db: {
    host: required('DB_HOST'),
    port: Number(process.env.DB_PORT) || 3306,
    name: required('DB_NAME'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
  },
};
