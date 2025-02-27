import { expect, describe, it, beforeEach, beforeAll, afterAll } from 'vitest';
import { db } from '../../src/config/database.js';
import { UserFactory } from '../testSupport/userFactory.js';
import { ShortUrlFactory } from '../testSupport/shortUrlFactory.js';
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

describe('UserModel', () => {
    describe('create', () => {
        it('creates a new user with valid data', async () => {
            const user = await UserFactory.create();

            const foundUser = await db('users').where({ id: user.id }).first();

            expect(foundUser).toBeDefined();
            expect(foundUser.id).toBe(user.id);
            expect(foundUser.name).toBe(user.name);
            expect(foundUser.email).toBe(user.email);
            expect(foundUser.password).toBe(user.password);
        });

        it('fails to create a user without required fields', async () => {
            await expect(UserFactory.create({ name: null })).rejects.toThrow();
            await expect(UserFactory.create({ email: null })).rejects.toThrow();
            await expect(UserFactory.create({ password: null })).rejects.toThrow();
        });

        it('fails to create a user with an invalid email', async () => {
            await expect(UserFactory.create({ email: 'invalid-email' })).rejects.toThrow();
        });

        it('fails to create a user with a name longer than 80 characters', async () => {
            const longName = 'a'.repeat(81);
            await expect(UserFactory.create({ name: longName })).rejects.toThrow();
        });

        it('fails to create a user with an email longer than 150 characters', async () => {
            const longEmail = 'a'.repeat(151) + '@example.com';
            await expect(UserFactory.create({ email: longEmail })).rejects.toThrow();
        });

        it('fails to create a user with a password shorter than 8 characters', async () => {
            const shortPassword = '1234567';
            await expect(UserFactory.create({ password: shortPassword })).rejects.toThrow();
        });

        it('fails to create a user with a password longer than 100 characters', async () => {
            const longPassword = 'a'.repeat(101);
            await expect(UserFactory.create({ password: longPassword })).rejects.toThrow();
        });
    });

    describe('relations', () => {
        it('has many short URLs', async () => {
                const user = await UserFactory.create();

            await db('shortUrls').insert([
                { short_url: 'http://localhost:3000/abc123', original_url: 'https://example.com', user_id: user.id },
                { short_url: 'http://localhost:3000/def456', original_url: 'https://anotherexample.com', user_id: user.id },
            ]);

            const shortUrls = await db('shortUrls').where({ user_id: user.id });
            expect(shortUrls).toHaveLength(2);
            expect(shortUrls[0].user_id).toBe(user.id);
            expect(shortUrls[1].user_id).toBe(user.id);
        });
    });
});