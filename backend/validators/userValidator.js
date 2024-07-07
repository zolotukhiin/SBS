import { check, validationResult } from 'express-validator';
import User from '../models/userModel.js';

// Функция для проверки уникальности username
const isUsernameUnique = async (value) => {
    const user = await User.findOne({ where: { username: value } });
    if (user) {
        throw new Error('Имя пользователя уже занято');
    }
    return true;
};

// Функция для проверки уникальности number
const isNumberUnique = async (value) => {
    const user = await User.findOne({ where: { number: value } });
    if (user) {
        throw new Error('Номер телефона уже зарегистрирован');
    }
    return true;
};

// Валидатор для проверки информации для создания пользователя
export const validateUser = [
    check('firstName').notEmpty().withMessage('Имя обязательно для заполнения'),
    check('lastName').notEmpty().withMessage('Фамилия обязательна для заполнения'),
    check('username').notEmpty().withMessage('Имя пользователя обязательно для заполнения').custom(isUsernameUnique),
    check('number').isMobilePhone().withMessage('Некорректный номер телефона').custom(isNumberUnique),
    check('password').isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов'),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Валидатор для проверки обновленной информации о пользователе
export const validateUserUpdate = [
    check('firstName').optional().notEmpty().withMessage('Имя обязательно для заполнения'),
    check('lastName').optional().notEmpty().withMessage('Фамилия обязательна для заполнения'),
    check('username').optional().notEmpty().withMessage('Имя пользователя обязательно для заполнения').custom(isUsernameUnique),
    check('number').optional().isMobilePhone().withMessage('Некорректный номер телефона'),
    check('password').optional().isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов'),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

