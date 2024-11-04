import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/users', userController.createUser);
router.post('/login', userController.login); // Add this route for logging in
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getAllUsers);

export default router;
