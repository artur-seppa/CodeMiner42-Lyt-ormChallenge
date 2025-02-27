import { User } from '../models/User.mjs';

export class UserRepository {
    async createUser(name, password, email) {
        const user = await User.query().insert({
            name,
            password,
            email,
        });

        return user;
    }

    async findUserById(id) {
        const user = await User.query().findOne({ id: id });
        return user;
    }
}