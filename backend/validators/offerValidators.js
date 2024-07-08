import { check, validationResult } from 'express-validator';

// Массив валидаторов для проверки входных данных
export const offerCreateValidator = [
    check('itemId')
        .exists().withMessage('itemId обязателен для заполнения')
        .isInt({ min: 1 }).withMessage('itemId должен быть целым числом от 1'),

    check('duration')
        .exists().withMessage('duration обязателен для заполнения')
        .isInt({ min: 1, max: 31 }).withMessage('duration должен быть целым числом от 1 до 31'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }
        next();
    }
];

export const offerUpdateValidator = [
    check('duration')
        .exists().withMessage('duration обязателен для заполнения')
        .isInt({ min: 1, max: 31 }).withMessage('duration должен быть целым числом от 1 до 31'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }
        next();
    }
];