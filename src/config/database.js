import dotenv from 'dotenv';
import knex from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const developmentConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '172.28.137.108',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'reiman123',
    database: process.env.DB_NAME || 'codeminer_orm_challenge',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'migrations'),
  },
};

const testConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '172.28.137.108',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'reiman123',
    database: process.env.DB_NAME_TEST || 'codeminer_orm_challenge_test',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'migrations'),
  },
};

const config = process.env.NODE_ENV === 'test' ? testConfig : developmentConfig;

export const db = knex(config);