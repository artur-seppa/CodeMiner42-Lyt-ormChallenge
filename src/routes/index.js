import { urlRoute } from './urlRoute.js';
import { userRoute } from './userRoute.js';

export function routerPlugin(fastify, options, done) {
    fastify.register(urlRoute, { prefix: '/' });
    fastify.register(userRoute, { prefix: '/user' });

    done();
}