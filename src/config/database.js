import dotenv from 'dotenv';
import knex from 'knex';
import path from 'path';

dotenv.config({ path: '../../.env' });

const developmentConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'migrations'),
  },
};

const testConfig = {
  client: 'pg',
  connection: {
    host: '172.28.137.108',
    port: 5432,
    user: 'postgres',
    password: 'reiman123',
    database: 'codeminer_orm_challenge_test',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'migrations'),
  },
};

const config = process.env.NODE_ENV === 'test' ? testConfig : developmentConfig;

export const db = knex(config);