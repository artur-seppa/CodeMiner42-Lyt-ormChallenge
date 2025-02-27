import { encodeBase62 } from './encode/base62.js';
import { isValidUrl } from './encode/isValidUrl.js';
import { UrlRepository } from '../repositories/urlRepository.js';

export class UrlService {
    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async createShortUrl(user_id, original_url) {
        if (!original_url || !isValidUrl(original_url)) {
            return {
                status: 'error',
                message: 'Invalid URL',
            };
        }

        const shortCode = encodeBase62(Date.now() + original_url.length);
        const short_url = 'http://localhost:3000/' + shortCode

        const url = await this.urlRepository.createUrl({
            user_id,
            short_url,
            original_url,
        });

        if (!url) {
            return {
                status: 'error',
                message: 'Invalid user',
            };
        }

        return {
            status: 'success',
            short_url: url.short_url,
            original_url: url.original_url
        };
    }

    async getOriginalUrl(ip_address, shortCode) {
            const url = await this.urlRepository.findUrlByShortCode({ip_address, shortCode});

            if (!url) {
                return {
                    status: 'error',
                    message: 'Short URL not found',
                };
            }

            return {
                status: 'success',
                original_url: url.original_url,
            };
    }

    async getUrlVisits(shortCode) {
            const url = await this.urlRepository.countVisits(shortCode);

            if (!url) {
                return {
                    status: 'error',
                    message: 'Short URL not found',
                };
            }

            return {
                status: 'success',
                visits: url.visits,
            };
    }
}