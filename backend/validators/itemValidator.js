import { check, validationResult } from 'express-validator';

// Валидация данных для создания предмета
export const validateItemCreate = [
    check('name')
        .notEmpty().withMessage('Название предмета обязательно для заполнения.')
        .isString().withMessage('Название предмета должно быть строкой.')
        .isLength({ max: 50 }).withMessage('Название предмета должно быть до 50 символов.'),
    check('description')
        .notEmpty().withMessage('Описание предмета обязательно для заполнения.')
        .isString().withMessage('Описание предмета должно быть строкой.')
        .isLength({ max: 1000 }).withMessage('Описание предмета должно быть до 1000 символов.'),
    check('isActive')
        .optional()
        .isBoolean().withMessage('Поле активности должно быть булевым значением.'),

    // Middleware для обработки ошибок валидации
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }
        next();
    }
];

// Валидация обновления данных предмета
export const validateItemUpdate = [
    check('name')
        .optional()
        .isString().withMessage('Название предмета должно быть строкой.')
        .isLength({ max: 50 }).withMessage('Название предмета должно быть до 50 символов.'),
    check('description')
        .optional()
        .isString().withMessage('Описание предмета должно быть строкой.')
        .isLength({ max: 1000 }).withMessage('Описание предмета должно быть до 1000 символов.'),
    check('isActive')
        .optional()
        .isBoolean().withMessage('Поле активности должно быть булевым значением.'),

    // Middleware для обработки ошибок валидации
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }
        next();
    }
];