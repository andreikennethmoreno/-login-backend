// src/services/userService.js
import User from '../models/User.js';

class UserService {
    async createUser(userData) {
        const user = await User.create(userData);
        return user;
    }

    async getUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async getUserById(id) {
        return await User.findByPk(id);
    }

    async getAllUsers() {
        return await User.findAll();
    }
}

export default new UserService();
