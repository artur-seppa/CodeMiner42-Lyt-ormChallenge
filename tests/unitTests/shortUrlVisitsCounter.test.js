import { describe, it, expect, beforeEach } from 'vitest';
import { redirectToVisitsCounter } from '../../src/service/redirectToVisitsCounter.js';

describe('redirect to visits counter', () => {
    let urlDatabase;

    beforeEach(() => {
        urlDatabase = {
            'abc123': {
                originalUrl: 'https://www.exemplo.com',
                createdAt: new Date(),
                visits: 5
            },
            '123xyz': {
                originalUrl: 'https://www.teste.com.br',
                createdAt: new Date(),
                visits: 10
            }
        };
    });

    it('should return the correct visit count when short code exists', () => {
        const result = redirectToVisitsCounter('abc123', urlDatabase);

        expect(result).toEqual({
            status: 'success',
            visits: 5
        });
    });

    it('should return error when short code does not exist', () => {
        const result = redirectToVisitsCounter('blabla', urlDatabase);

        expect(result).toEqual({
            status: 'error',
            message: 'Short URL not found'
        });
    });

    it('should return error when short code is empty', () => {
        const result = redirectToVisitsCounter('', urlDatabase);

        expect(result).toEqual({
            status: 'error',
            message: 'Short URL not found'
        });
    });

    it('should return error when short code is null', () => {
        const result = redirectToVisitsCounter(null, urlDatabase);

        expect(result).toEqual({
            status: 'error',
            message: 'Short URL not found'
        });
    });

    it('should return error when short code is undefined', () => {
        const result = redirectToVisitsCounter(undefined, urlDatabase);

        expect(result).toEqual({
            status: 'error',
            message: 'Short URL not found'
        });
    });
});
