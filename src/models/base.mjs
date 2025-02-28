import { Model } from 'objection';
import { db } from '../config/database.js';

Model.knex(db);

export { Model };