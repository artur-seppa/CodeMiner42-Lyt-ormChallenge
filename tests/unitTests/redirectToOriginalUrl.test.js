import { describe, it, expect, beforeEach } from 'vitest';
import { redirectToOriginalUrl } from '../../src/service/redirectToOriginalUrl.js';

describe('redirect to original url', () => {
    let urlDatabase;

    beforeEach(() => {
        urlDatabase = {
            'abc123': {
                originalUrl: 'https://www.exemplo.com',
                createdAt: new Date(),
                visits: 0
            },
            '123xyz': {
                originalUrl: 'https://www.teste.com.br',
                createdAt: new Date(),
                visits: 0
            }
        };
    });

    it('should redirect to original URL when short code exists', () => {
        const result = redirectToOriginalUrl('abc123', urlDatabase);

        expect(result).toEqual({
            status: 'success',
            redirect: 'https://www.exemplo.com'
        });
    });

    it('should return error when short code does not exist', () => {
        const result = redirectToOriginalUrl('blabla', urlDatabase);

        expect(result).toEqual({
            status: 'error',
            message: 'Short URL not found'
        });
    });

    it('should return error when short code is empty', () => {
        const result = redirectToOriginalUrl('', urlDatabase);

        expect(result).toEqual({
            status: 'error',
            message: 'Short URL not found'
        });
    });

    it('should return error when short code is null', () => {
        const result = redirectToOriginalUrl(null, urlDatabase);

        expect(result).toEqual({
            status: 'error',
            message: 'Short URL not found'
        });
    });

    it('should return error when short code is undefined', () => {
        const result = redirectToOriginalUrl(undefined, urlDatabase);

        expect(result).toEqual({
            status: 'error',
            message: 'Short URL not found'
        });
    });
});