import 'dotenv/config';
import type { Options } from 'sequelize';
import { env } from '../../config/env';

const config: Options = {
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  host: env.db.host,
  port: env.db.port,
  dialect: 'mysql',
  define: { underscored: true },
};

export = config;
