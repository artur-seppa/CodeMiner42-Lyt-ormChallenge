import { ShortUrl } from '../models/ShortUrl.mjs';
import { Clicks } from '../models/Clicks.mjs';
import { User } from '../models/User.mjs';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export class UrlRepository {
    async createUrl(urlData) {
        const { user_id, short_url, original_url, utm_parameters } = urlData;

        return await ShortUrl.transaction(async (trx) => {
            const user = User.query().findById(user_id);

            if (user == undefined) {
                return false;
            }

            return ShortUrl.query().insert({
                original_url,
                utm_parameters,
                short_url,
                user_id,
            });
        });
    }

    async findUrlByShortCode(urlData) {
        const { ip_address, shortCode } = urlData;
        const short_url = process.env.BASE_URL + shortCode;

        return await ShortUrl.transaction(async (trx) => {
            const url = ShortUrl.query().findOne({ short_url: short_url });

            if (url == undefined) {
                return false;
            }

            Clicks.query().insert({
                ip_address,
                shorturl_id: url.id
            });

            return url;
        });
    }

    async countVisits(shortCode) {
        const short_url = process.env.BASE_URL + shortCode;
        
        return await ShortUrl.transaction(async (trx) => {
            const url = ShortUrl.query().findOne({ short_url: short_url });

            if (url === undefined) {
                return false;
            }

            return Clicks.query().count('* as visits').where({ shorturl_id: url.id }).first();
        });
    }
}