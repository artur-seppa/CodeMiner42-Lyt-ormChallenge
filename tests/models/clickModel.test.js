import { expect, describe, it, beforeEach, beforeAll, afterAll } from 'vitest';
import { db } from '../../src/config/database.js';
import { ClicksFactory } from '../testSupport/clickFactory.js';
import { ShortUrlFactory } from '../testSupport/shortUrlFactory.js';
import { UserFactory } from '../testSupport/userFactory.js';
import { clean } from 'knex-cleaner';

beforeAll(async () => {
    await clean(db);
});

beforeEach(async () => {
    await clean(db);
});

afterAll(async () => {
    await db.destroy();
});

describe('ClicksModel', () => {
    describe('create', () => {
        it('creates a new click with auto-generated short URL', async () => {
            const user = await UserFactory.create();
            const shortUrl = await ShortUrlFactory.create({ user_id: user.id });
            const click = await ClicksFactory.create({shorturl_id: shortUrl.id});

            const foundClick = await db('clicks').where({ id: click.id }).first();

            expect(foundClick).toBeDefined();
            expect(foundClick.id).toBe(click.id);
            expect(foundClick.ip_address).toBe(click.ip_address);
            expect(foundClick.shorturl_id).toBe(click.shorturl_id);
        });

        it('creates a new click with specific short URL', async () => {
            const user = await UserFactory.create();
            const shortUrl = await ShortUrlFactory.create({ user_id: user.id });
            const click = await ClicksFactory.create({ 
                shorturl_id: shortUrl.id,
                ip_address: '192.168.1.1' 
            });

            const foundClick = await db('clicks').where({ id: click.id }).first();

            expect(foundClick).toBeDefined();
            expect(foundClick.shorturl_id).toBe(shortUrl.id);
            expect(foundClick.ip_address).toBe('192.168.1.1');
        });

        it('fails to create a click without a valid short URL', async () => {
            await expect(ClicksFactory.create({ shorturl_id: 9999 })).rejects.toThrow();
        });

        it('fails to create a click with an invalid IP address', async () => {
            await expect(ClicksFactory.create({ ip_address: 'invalid-ip' })).rejects.toThrow();
        });
    });

    describe('relations', () => {
        it('belongs to a short URL', async () => {
            const user = await UserFactory.create();
            const shortUrl = await ShortUrlFactory.create({ user_id: user.id });
            const click = await ClicksFactory.create({ shorturl_id: shortUrl.id });

            const associatedShortUrl = await db('shortUrls').where({ id: click.shorturl_id }).first();
            
            expect(associatedShortUrl).toBeDefined();
            expect(associatedShortUrl.id).toBe(shortUrl.id);
        });
    });
});