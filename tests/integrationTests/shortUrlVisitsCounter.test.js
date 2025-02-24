import { beforeEach, afterAll, beforeAll, describe, it, expect } from 'vitest';
import { createServer } from '../../src/server.js';

describe('integration visits counter', () => {
    let server;
    let shortCode;
    const originalUrl = 'https://www.pcdf.df.gov.br/servicos/delegacia-eletronica';

    beforeAll(async () => {
        server = createServer();
        await server.ready();
    });

    afterAll(async () => {
        await server.close();
    });

    beforeEach(async () => {
        const reponse = await server.inject({
            method: 'POST',
            url: '/',
            payload: { url: originalUrl }
        });

        const body = JSON.parse(reponse.body);
        const shortUrl = body.shortUrl;
        shortCode = shortUrl.split('/').pop();
    });

    it.concurrent('should return the correct visit count when short code exists', async () => {
        await server.inject({
            method: 'GET',
            url: `/${shortCode}`
        });

        const response = await server.inject({
            method: 'GET',
            url: `/${shortCode}/visits`
        });

        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);
        expect(body.visits).toBe(1);
    });

    it.concurrent('should return error when short code does not exist', async () => {
        const response = await server.inject({
            method: 'GET',
            url: `/blabla`
        });

        const body = JSON.parse(response.body);

        expect(response.statusCode).toEqual(404);

        expect(body.statusCode).toBe(404);
        expect(body.code).toBe("RESOURCE_NOT_FOUND");
        expect(body.error).toBe("Not Found");
        expect(body.message).toBe("Short URL not found");
    });

    it.concurrent('should return error when short code is empty', async () => {
        const response = await server.inject({
            method: 'GET',
            url: `/`
        });

        const body = JSON.parse(response.body);

        expect(response.statusCode).toEqual(404);

        expect(body.statusCode).toBe(404);
        expect(body.code).toBe("RESOURCE_NOT_FOUND");
        expect(body.error).toBe("Not Found");
        expect(body.message).toBe("Short URL not found");
    });

});