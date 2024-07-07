import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { Op } from 'sequelize';

const jwtSecret = 'zolotukhin_esoft';
const saltRounds = 10; // Количество раундов для генерации соли

// Создание пользователя
export const createUser = async (req, res) => {
    const { firstName, lastName, username, number, password } = req.body;

    if (!firstName || !lastName || !username || !number || !password) {
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    try {
        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Создание пользователя с использованием Sequelize
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            number,
            password: hashedPassword
        });
        
        // Создание токена
        const token = jwt.sign(
            {
                user_id: newUser.id,
                username: newUser.username,
                number: newUser.number
            },
            jwtSecret,
            { expiresIn: '1h' } // Время истечения токена
        );

        res.status(201).json({
            user: {
                user_id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
                number: newUser.number
            },
            token
        });
    } catch (err) {
        console.error('Ошибка создания пользователя:', err.stack);
        res.status(500).json({ error: 'Ошибка сервера' , errmessage: err});
    }
};


// Получение всех пользоваталей 
export const getUsers = async (req, res) => {
    try {
        // Запрос на выборку всех пользователей
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'username', 'number']
        });

        res.status(200).json(users);
    } catch (err) {
        // Обработка ошибок
        console.error('Ошибка получения пользователей:', err.stack);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};


// Получение одного пользоваталя
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;  // Извлечение ID из параметров маршрута

        // Запрос на выборку пользователя по ID
        const user = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'username', 'number']
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    } catch (err) {
        // Обработка ошибок
        console.error('Ошибка получения пользователя:', err.stack);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};


// Обновление пользователя
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, username, number, password } = req.body;

    if (!firstName && !lastName && !username && !number && !password) {
        return res.status(400).json({ error: 'Хотя бы одно поле должно быть указано для обновления' });
    }

    try {
        // Проверка, что пользователь обновляет свои данные
        if (req.user.user_id != parseInt(id)) {
            return res.status(403).json({ error: 'Доступ запрещен' });
        }

        // Найти пользователя по ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // Обновить поля пользователя
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (username) user.username = username;
        if (number) user.number = number;
        if (password) user.password = await bcrypt.hash(password, saltRounds); // Хэшировать новый пароль

        // Сохранить изменения
        await user.save();

        res.status(200).json({
            message: 'Пользователь успешно обновлен',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                number: user.number
            }
        });
    } catch (err) {
        // Обработка ошибок
        console.error('Ошибка обновления пользователя:', err.stack);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Удаление пользователя
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Проверка, что пользователь удаляет свои данные
        if (req.user.user_id != parseInt(id)) {
            return res.status(403).json({ error: 'Доступ запрещен' });
        }

        // Найти пользователя по ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // Удалить пользователя
        await user.destroy();

        res.status(204).json({ message: 'Пользователь успешно удален' });
    } catch (err) {
        // Обработка ошибок
        console.error('Ошибка удаления пользователя:', err.stack);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Логин
export const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Создание условий для поиска пользователя по телефону или username
        const conditions = [];
        if (identifier) {
            conditions.push({ number: identifier });
            conditions.push({ username: identifier });
        }

        console.log(conditions)
        // Поиск пользователя в базе данных
        const user = await User.findOne({ 
            where: {
                [Op.or]: conditions
            }
        });

        // Проверка, найден ли пользователь и соответствует ли введённый пароль
        if (!user) {
            return res.status(401).json({ error: 'Неправильные учетные данные' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Неправильные учетные данные' });
        }

        // Создание JWT токена
        const token = jwt.sign(
            { user_id: user.id, phone: user.phone, username: user.username },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Успешный вход в систему', token: token });
    } catch (err) {
        console.error('Ошибка входа:', err.stack);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Выход
export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Успешный выход' });
};

// Информация о пользователе
export const getUserInfo = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.status(200).json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            number: user.number
        });

    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера'});
    }
};