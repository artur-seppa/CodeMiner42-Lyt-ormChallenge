import { ShortUrl } from '../models/ShortUrl.mjs';
import { Clicks } from '../models/Clicks.mjs';
import { User } from '../models/User.mjs';

export class UrlRepository {
    async createUrl(urlData) {
        const { user_id, short_url, original_url } = urlData;

        return await ShortUrl.transaction(async (trx) => {
            const user = await User.query().findById(user_id);

            if (user == undefined) {
                return false;
            }

            return await ShortUrl.query().insert({
                original_url,
                short_url,
                user_id
            });
        });
    }

    async findUrlByShortCode(urlData) {
        const { ip_address, shortCode } = urlData;
        const short_url = 'http://localhost:3000/' + shortCode;

        return await ShortUrl.transaction(async (trx) => {
            const url = await ShortUrl.query().findOne({ short_url: short_url });

            if (url == undefined) {
                return false;
            }

            await Clicks.query().insert({
                ip_address,
                shorturl_id: url.id
            });

            return url;
        });
    }

    async countVisits(shortCode) {
        const short_url = 'http://localhost:3000/' + shortCode;

        return await ShortUrl.transaction(async (trx) => {
            const url = await ShortUrl.query().findOne({ short_url: short_url });

            console.log(url);
            if (url == undefined) {
                return false;
            }

            return await Clicks.query().count('* as visits').where({ shorturl_id: url.id }).first();
        });
    }
}