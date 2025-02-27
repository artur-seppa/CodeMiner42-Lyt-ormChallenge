import { UserService } from '../service/userService.js';

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async createUser(request, reply) {
        try {
            const { name, password, email } = request.body;

            const response = await this.userService.createUser(name, password, email);

            if (response.status === 'error') {
                return reply.status(400).send({
                    message: response.message
                });
            }

            return reply.status(201).send({
                status: response.status,
                user: response.user,
            });
        } catch (error) {
            return reply.status(500).send({
                error
            });
        }
    }
}