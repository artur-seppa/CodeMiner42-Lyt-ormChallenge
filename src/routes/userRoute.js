import { UserController } from '../controllers/userController.js';

export function userRoute(fastify, options, done) {
    const userController = new UserController();

    fastify.post('/', async (request, reply) => {
        return userController.createUser(request, reply);
    });

    done();
}
