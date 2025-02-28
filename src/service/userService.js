import { UserRepository } from '../repositories/userRepository.js';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(name, password, email) {
        if (!name || !password || !email) {
            return {
                status: 'error',
                message: 'Name, password, and email are required.',
            };
        }

        const user = await this.userRepository.createUser(name, password, email);

        return {
            status: 'success',
            user,
        };
    }
}