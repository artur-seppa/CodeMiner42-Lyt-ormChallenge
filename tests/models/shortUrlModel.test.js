import { expect, describe, it, beforeEach, beforeAll, afterAll } from 'vitest';
import { db } from '../../src/config/database.js';
import { UserFactory } from '../testSupport/userFactory.js';
import { ShortUrlFactory } from '../testSupport/shortUrlFactory.js';
import { clean } from 'knex-cleaner';
import { ShortUrl } from '../../src/models/ShortUrl.mjs';

beforeAll(async () => {
    await clean(db);
});

beforeEach(async () => {
    await clean(db);
});

afterAll(async () => {
    await db.destroy();
});

describe('ShortUrlModel', () => {
    describe('create', () => {
        it('creates a new short URL with valid data', async () => {
            const user = await UserFactory.create();
            const shortUrl = await ShortUrlFactory.create({ user_id: user.id });

            const foundShortUrl = await db('shortUrls').where({ id: shortUrl.id }).first();

            expect(foundShortUrl).toBeDefined();
            expect(foundShortUrl.original_url).toBe(shortUrl.original_url);
            expect(foundShortUrl.short_url).toBe(shortUrl.short_url);
            expect(foundShortUrl.user_id).toBe(user.id);
        });

        it('fails to create a short URL without original_url', async () => {
            const user = await UserFactory.create();
            await expect(ShortUrlFactory.create({
                original_url: null,
                user_id: user.id
            })).rejects.toThrow();
        });

        it('fails to create a short URL with invalid original_url', async () => {
            const user = await UserFactory.create();
            const invalidUrls = [
                'not-a-url',
                'ftp://example.com',
                'just text'
            ];

            for (const invalidUrl of invalidUrls) {
                await expect(ShortUrlFactory.create({
                    original_url: invalidUrl,
                    user_id: user.id
                })).rejects.toThrow();
            }
        });

        it('fails to create a short URL with invalid short_url', async () => {
            const user = await UserFactory.create();
            const invalidUrls = [
                'not-a-url',
                'ftp://localhost/short',
                'just text'
            ];

            for (const invalidUrl of invalidUrls) {
                await expect(ShortUrlFactory.create({
                    short_url: invalidUrl,
                    user_id: user.id
                })).rejects.toThrow();
            }
        });
    });

    describe('utm_parameters', () => {
        it('creates a short URL with UTM parameters', async () => {
            const user = await UserFactory.create();
            const utmParams = {
                utm_source: 'google',
                utm_medium: 'cpc',
                utm_campaign: 'summer_sale'
            };

            const shortUrl = await ShortUrlFactory.create({
                user_id: user.id,
                utm_parameters: utmParams
            });

            const foundShortUrl = await db('shortUrls').where({ id: shortUrl.id }).first();

            expect(foundShortUrl.utm_parameters).toBeDefined();
            expect(foundShortUrl.utm_parameters).toEqual(utmParams);
        });

        it('can create short URL without UTM parameters', async () => {
            const user = await UserFactory.create();
            const shortUrl = await ShortUrlFactory.create({
                user_id: user.id,
                utm_parameters: null
            });

            const foundShortUrl = await db('shortUrls').where({ id: shortUrl.id }).first();

            expect(foundShortUrl.utm_parameters).toBeNull();
        });

    });

    describe('relations', () => {
        it('belongs to a user', async () => {
            const user = await UserFactory.create();
            const shortUrl = await ShortUrlFactory.create({ user_id: user.id });

            const foundUser = await shortUrl.$relatedQuery('user');

            expect(foundUser).toBeDefined();
            expect(foundUser.id).toBe(user.id);
        });

        it('has many clicks', async () => {
            const user = await UserFactory.create();
            const shortUrl = await ShortUrlFactory.create({ user_id: user.id });

            await db('clicks').insert([
                { shorturl_id: shortUrl.id, ip_address: '192.168.1.1' },
                { shorturl_id: shortUrl.id, ip_address: '192.168.1.2' }
            ]);

            const clicks = await shortUrl.$relatedQuery('click');

            expect(clicks).toHaveLength(2);
            expect(clicks[0].shorturl_id).toBe(shortUrl.id);
            expect(clicks[1].shorturl_id).toBe(shortUrl.id);
        });
    });

    describe('timestamps', () => {
        it('automatically sets created_at timestamp', async () => {
            const user = await UserFactory.create();
            const shortUrl = await ShortUrlFactory.create({ user_id: user.id });

            expect(shortUrl.created_at).toBeDefined();
            expect(new Date(shortUrl.created_at).toISOString()).toBe(shortUrl.created_at);
        });
    });
});