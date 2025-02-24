import { AuthController } from '../controllers/authController.js';

export function authRoute(fastify, options, done) {
    const authController = new AuthController(fastify);

    fastify.get('/', async (request, reply) => {
        return authController.login(request, reply);
    });

    done();
}