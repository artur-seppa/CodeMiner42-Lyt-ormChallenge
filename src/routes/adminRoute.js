import { AdminController } from '../controllers/adminController.js';

export function adminRoute(fastify, options, done) {
    const urlDatabase = fastify.urlDatabase;
    const adminController = new AdminController(urlDatabase);

    fastify.get('/urls', async (request, reply) => {
        return adminController.listUrls(request, reply)
    });

    fastify.delete('/urls/:shortCode', async (request, reply) => {
        return adminController.deleteUrl(request, reply);
    });

    done();
}
