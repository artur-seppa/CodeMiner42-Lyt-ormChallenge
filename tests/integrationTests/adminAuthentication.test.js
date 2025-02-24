import { beforeEach, afterAll, beforeAll, describe, it, expect } from 'vitest';
import { createServer } from '../../src/server.js';

describe('integration admin authentication', () => {
    let server;

    beforeAll(async () => {
        server = createServer();
        await server.ready();
    });

    afterAll(async () => {
        await server.close();
    });

    it.concurrent('should create a login token', async () => {
        const response = await server.inject({
            method: 'GET',
            url: `/login`
        });

        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);
        expect(body.token).toBeDefined();
    });

    it.concurrent('should return 404 if no authorization header is provided', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/admin',
        });

        expect(response.statusCode).toBe(404);
        const body = JSON.parse(response.body);
        expect(body.message).toBe('Not Found');
    });

    it.concurrent('should return 401 if an invalid token is provided', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/admin',
            headers: {
                authorization: 'Bearer invalid_token'
            }
        });

        expect(response.statusCode).toBe(401);
        const body = JSON.parse(response.body);
        expect(body.message).toBe('Unauthorized');
    });

    it.concurrent('should allow access with a valid token', async () => {
        const responseLogin = await server.inject({
            method: 'GET',
            url: `/login`
        });

        const bodyLogin = JSON.parse(responseLogin.body);
        const validToken = bodyLogin.token;

        const response = await server.inject({
            method: 'GET',
            url: '/admin/urls',
            headers: {
                authorization: `Bearer ${validToken}`
            }
        });

        expect(response.statusCode).toBe(200);
    });

});