import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '../../.env' });

export default {
  development: {
    client: 'pg',
    connection: {
      host: '172.28.137.108',
      port: 5432,
      user: 'postgres',
      password: 'reiman123',
      database: 'codeminer_orm_challenge',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'migrations'),
    },
  },
};