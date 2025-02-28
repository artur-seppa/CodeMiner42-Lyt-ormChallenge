import { Model } from './base.mjs';
import {User} from './User.mjs';
import {Clicks} from './Clicks.mjs';

export class ShortUrl extends Model {
    static get tableName() {
        return 'shortUrls';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['original_url', 'short_url'],
            properties: {
                id: { type: 'integer' },
                original_url: {
                    type: 'string',
                    format: 'uri',
                    pattern: '^https?://.*$'
                },
                short_url: {
                    type: 'string',
                    format: 'uri',
                    pattern: '^https?://.*$'
                },
                created_at: {
                    type: 'string',
                    format: 'date-time'
                },
                user_id: {
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
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'shortUrls.user_id',
                    to: 'users.id'
                }
            },

            click: {
                relation: Model.HasManyRelation,
                modelClass: Clicks,
                join: {
                    from: 'shortUrls.id',
                    to: 'clicks.shorturl_id'
                }
            }
        };
    }
}