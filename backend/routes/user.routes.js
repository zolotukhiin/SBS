import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, logoutUser, getUserInfo } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { validateUser, validateUserUpdate } from '../validators/userValidator.js';

const router = express.Router();

// Маршрут для создания пользователя
router.post('/users', validateUser, createUser);

// Маршрут для получения списка пользователей
router.get('/users', getUsers);

// Маршрут для получения пользователя
router.get('/users/:id', authenticateToken, getUserById);

// Маршрут для обновления одного пользоваталя - put
router.put('/users/:id', authenticateToken, validateUserUpdate, updateUser);

// Маршрут для удаления пользователя
router.delete('/users/:id', authenticateToken, deleteUser)

// Маршрут для входа пользователя
router.post('/login', loginUser);

// Маршрут для выхода пользователя
router.post('/logout', logoutUser);

//
router.get('/me', authenticateToken, getUserInfo)

export default router;