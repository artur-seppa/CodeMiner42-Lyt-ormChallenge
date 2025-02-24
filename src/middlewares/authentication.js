import fp from 'fastify-plugin';
import { validateToken } from './tokenValidation.js';

export default fp(async function (fastify, opts) {
    fastify.addHook('onRequest', async (request, reply) => {
        if (request.url.startsWith('/admin')) {
            const authHeader = request.headers.authorization

            if (!authHeader) {
                return reply.code(404).send({
                    message: 'Not Found'
                })
            }

            const token = authHeader.split(' ')[1]
            const isValidToken = validateToken(fastify, token)

            if (!isValidToken) {
                return reply.code(401).send({
                    message: 'Unauthorized'
                })
            }
        }
    })
})