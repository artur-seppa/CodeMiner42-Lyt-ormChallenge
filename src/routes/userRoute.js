import { UserController } from '../controllers/userController.js';

export function userRoute(fastify, options, done) {
    const urlDatabase = fastify.urlDatabase;
    const userController = new UserController(urlDatabase);

    fastify.post('/', async (request, reply) => {
        return userController.createShortUrl(request, reply);
    });

    fastify.get('/:shortCode', async (request, reply) => {
        return userController.redirect(request, reply);
    });

    fastify.get('/:shortCode/visits', async (request, reply) => {
        return userController.visitsCounter(request, reply);
    });

    done();
}
