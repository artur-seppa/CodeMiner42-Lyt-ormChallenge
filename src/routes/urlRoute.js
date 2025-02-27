import { UrlController } from '../controllers/urlController.js';

export function urlRoute(fastify, options, done) {
    const urlController = new UrlController();

    fastify.post('/', async (request, reply) => {
        return urlController.createShortUrl(request, reply);
    });

    fastify.get('/:shortCode', async (request, reply) => {
        return urlController.redirect(request, reply);
    });

    fastify.get('/:shortCode/visits', async (request, reply) => {
        return urlController.visitsCounter(request, reply);
    });

    done();
}
