import { userRoute } from './userRoute.js';
import { adminRoute } from './adminRoute.js';
import { authRoute } from './authRoute.js';

export function routerPlugin(fastify, options, done) {
    fastify.register(userRoute, { prefix: '/' });
    fastify.register(authRoute, { prefix: '/login' });
    fastify.register(adminRoute, { prefix: '/admin' });

    done();
}