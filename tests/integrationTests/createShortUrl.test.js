import { beforeEach, afterAll, beforeAll, describe, it, expect } from 'vitest';
import { createServer } from '../../src/server.js';

describe('integration createShortUrl', () => {
    let server;

    beforeAll(async () => {
        server = createServer();
        await server.ready();
    });

    afterAll(async () => {
        await server.close();
    });

    it.concurrent('should successfully create a short URL for a valid URL', async () => {
        const originalUrl = 'https://www.pcdf.df.gov.br/servicos/delegacia-eletronica';

        const response = await server.inject({
            method: 'POST',
            url: '/',
            payload: {
                url: originalUrl
            }
        });

        const body = JSON.parse(response.body);

        expect(response.statusCode).toEqual(201);
        expect(body.shortUrl).toBeDefined();
        expect(body.originalUrl).toBe(originalUrl);
    });

    it.concurrent('should generate unique short codes for same URLs', async () => {
        const originalUrl = 'https://www.example1.com';

        const response1 = await server.inject({
            method: 'POST',
            url: '/',
            payload: {
                url: originalUrl
            }
        });

        const response2 = await server.inject({
            method: 'POST',
            url: '/',
            payload: {
                url: originalUrl
            }
        });

        const body1 = JSON.parse(response1.body);
        const body2 = JSON.parse(response2.body);

        expect(body1.shortUrl).not.toBe(body2.shortUrl);
    });

    it.concurrent('should generate unique short codes for different URLs', async () => {
        const url1 = 'https://www.example1.com';
        const url2 = 'https://www.example2.com';

        const result1 = await server.inject({
            method: 'POST',
            url: '/',
            payload: {
                url: url1
            }
        });

        const result2 = await server.inject({
            method: 'POST',
            url: '/',
            payload: {
                url: url2
            }
        });

        const body1 = JSON.parse(result1.body);
        const body2 = JSON.parse(result2.body);

        expect(body1.shortUrl).not.toBe(body2.shortUrl);
    });

    it.concurrent('should return error for invalid URLs', () => {
        const invalidUrls = [
            null,
            undefined,
            '',
            'not-a-url',
            'www.example.com',
            'http://',
            'https://'
        ];

        invalidUrls.forEach(async invalidUrl => {
            const result = await server.inject({
                method: 'POST',
                url: '/',
                payload: {
                    url: invalidUrl
                }
            });

            const body = JSON.parse(result.body);

            expect(result.statusCode).toEqual(400);
            expect(body.message).toBe('invalid URL');
        });
    });
});
