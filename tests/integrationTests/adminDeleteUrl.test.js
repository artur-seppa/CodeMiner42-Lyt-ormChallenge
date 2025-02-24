import { beforeEach, afterAll, beforeAll, describe, it, expect } from 'vitest';
import { createServer } from '../../src/server.js';

describe('integration admin delete url', () => {
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

    it.concurrent('should delete a url of the list', async () => {
        const response = await server.inject({
            method: 'DELETE',
            url: `/admin/urls/${shortCode}`
        });

        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);
        expect(body.status).toBe('success');
        expect(body.message).toBe('URL deleted successfully');
    });

    it.concurrent('should return an error when not exists any shortCode', async () => {
        const response = await server.inject({
            method: 'DELETE',
            url: '/admin/urls/'
        });

        expect(response.statusCode).toEqual(404);

        const body = JSON.parse(response.body);
        expect(body.code).toBe('RESOURCE_NOT_FOUND');
        expect(body.message).toBe('Short URL not found');
    });

    it.concurrent('should return an error when pass a invalid shortCode', async () => {
        const response = await server.inject({
            method: 'DELETE',
            url: '/admin/urls/blabla'
        });

        expect(response.statusCode).toEqual(404);

        const body = JSON.parse(response.body);
        expect(body.code).toBe('RESOURCE_NOT_FOUND');
        expect(body.message).toBe('Short URL not found');
    });

});