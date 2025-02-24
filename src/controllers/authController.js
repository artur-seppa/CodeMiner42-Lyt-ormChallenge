export class AuthController {
    constructor(fastify) {
        this.fastify = fastify;
    }

    async login(request, reply) {
        const token = this.fastify.jwt.sign({
            role: 'admin'
        });

        return { token };
    }
}