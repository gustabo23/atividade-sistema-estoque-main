import 'dotenv/config';
import { App } from './app';
import { env } from './config/env';
import { setupAssociations } from './database/models/associations';

setupAssociations();

new App().start(env.port);
