import { Model } from './base.mjs';
import { ShortUrl } from './ShortUrl.mjs';

export class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', maxLength: 80 },
                email: { type: 'string', format: 'email', maxLength: 150 },
                password: { type: 'string', minLength: 8, maxLength: 100 },
            }
        };
    }

    static get relationMappings() {
        return {
            short_url: {
                relation: Model.HasManyRelation,
                modelClass: ShortUrl,
                join: {
                    from: 'users.id',
                    to: 'shortUrls.user_id'
                }
            }
        };
    }
}