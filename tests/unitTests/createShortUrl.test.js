import { describe, it, expect, beforeEach } from 'vitest';
import { createShortUrl } from '../../src/service/createShortUrl.js';

describe('createShortUrl', () => {
    let urlDatabase;

    beforeEach(() => {
        urlDatabase = {};
    });

    it('should successfully create a short URL for a valid URL', () => {
        const originalUrl = 'https://www.example.com';
        const result = createShortUrl(originalUrl, urlDatabase);

        expect(result.status).toBe('success');
        expect(result.shortCode).toBeTruthy();
        expect(result.shortUrl).toMatch(/^http:\/\/localhost:3000\/.+/);
        expect(result.originalUrl).toBe(originalUrl);
        
        expect(Object.keys(urlDatabase).length).toBe(1);
        const storedUrl = urlDatabase[result.shortCode];
        expect(storedUrl.originalUrl).toBe(originalUrl);
        expect(storedUrl.visits).toBe(0);
        expect(storedUrl.createdAt).toBeInstanceOf(Date);
    });

    it('should generate unique short codes for same URLs', () => {
        const url1 = 'https://www.example1.com';

        const result1 = createShortUrl(url1, urlDatabase);
        const result2 = createShortUrl(url1, urlDatabase);

        expect(result1.shortCode).not.toBe(result2.shortCode);
        expect(Object.keys(urlDatabase).length).toBe(2);
    });

    it('should generate unique short codes for different URLs', () => {
        const url1 = 'https://www.example1.com';
        const url2 = 'https://www.example2.com';

        const result1 = createShortUrl(url1, urlDatabase);
        const result2 = createShortUrl(url2, urlDatabase);

        expect(result1.shortCode).not.toBe(result2.shortCode);
        expect(Object.keys(urlDatabase).length).toBe(2);
    });

    it('should return error for invalid URLs', () => {
        const invalidUrls = [
            null, 
            undefined, 
            '', 
            'not-a-url', 
            'www.example.com', 
            'http://', 
            'https://'
        ];

        invalidUrls.forEach(invalidUrl => {
            const result = createShortUrl(invalidUrl, urlDatabase);

            expect(result.status).toBe('error');
            expect(result.message).toBe('invalid URL');
        });

        expect(Object.keys(urlDatabase).length).toBe(0);
    });
});