import { Model } from 'objection';
import knex from '../config/database.js';

Model.knex(knex);

export default Model;