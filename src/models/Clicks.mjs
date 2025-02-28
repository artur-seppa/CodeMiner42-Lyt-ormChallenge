import { Model } from './base.mjs';
import {ShortUrl} from './ShortUrl.mjs';

export class Clicks extends Model {
    static get tableName() {
        return 'clicks';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['ip_address'],
            properties: {
                id: { type: 'integer' },
                ip_address: { 
                    type: 'string',
                    minLength: 7, 
                    maxLength: 15
                 },
                created_at: {
                    type: 'string',
                    format: 'date-time'
                },
                shorturl_id: {
                    type: 'integer'
                }
            }
        };
    }

    $beforeInsert() {
        const timestamp = new Date().toISOString();
        this.created_at = timestamp;
    }

    static get relationMappings() {
        return {
            shorturl: {
                relation: Model.BelongsToOneRelation,
                modelClass: ShortUrl,
                join: {
                    from: 'clicks.shorturl_id',
                    to: 'shortUrls.id'
                }
            }
        };
    }
}