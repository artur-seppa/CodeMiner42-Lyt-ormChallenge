import Fastify from 'fastify';
import { routerPlugin } from './routes/index.js';
import authPlugin from './middlewares/authentication.js';
import fastifyJwt from '@fastify/jwt';

const fastify = Fastify({ logger: true });

function createServer() {
    try {
        const urlDatabase = {};
        fastify.decorate('urlDatabase', urlDatabase);

        fastify.register(fastifyJwt, {
            secret: 'codeminer42'
        })
        fastify.register(authPlugin);
        fastify.register(routerPlugin);
        return fastify;
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

export { createServer };