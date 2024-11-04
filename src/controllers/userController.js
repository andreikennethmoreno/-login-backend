import userService from '../services/userService.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';

class UserController {
    async createUser(req, res) {
        try {
            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await userService.createUser({
                ...req.body,
                password: hashedPassword,
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


 async login(req, res) {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token, // Send token in response
            userId: user.id,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

}

export default new UserController();
