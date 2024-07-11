import Item from '../models/itemModel.js';
import User from '../models/userModel.js';

// Функция создания предмета
export const createItem = async (req, res) => {
    const { name, description, category, photos, isActive } = req.body;
    const authorId = req.user.user_id; // Получение ID текущего пользователя из токена

    try {
        // Создание нового предмета
        const newItem = await Item.create({
            name,
            description,
            category,
            photos,
            isActive,
            authorId: authorId,
            createdAt: new Date()
        });

        const author = await User.findByPk(authorId, {
            attributes: ['firstName', 'lastName']
        });

        // Возврат успешного ответа с созданным предметом
        return res.status(201).json({
            id: newItem.id,
            name: newItem.name,
            description: newItem.description,
            category: newItem.category,
            photos: newItem.photos,
            isActive: newItem.isActive,
            author: {
                firstName: author.firstName,
                lastName: author.lastName
            },
            createdAt: newItem.createdAt
        });
    } catch (error) {
        console.error('Ошибка при создании предмета:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Функция изменения данных предмета
export const updateItem = async (req, res) => {
    const itemId = req.params.id; // Получение ID предмета из URL
    const { name, description, category, photos, isActive } = req.body;

    try {
        // Проверка, существует ли предмет с указанным itemId
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Предмет не найден' });
        }

        // Проверка, может ли текущий пользователь изменять данный предмет
        if (item.authorId !== req.user.user_id) {
            return res.status(403).json({ error: 'Нет разрешения на изменение этого предмета' });
        }

        // Обновление данных предмета (только для тех полей, которые были отправлены в запросе)
        if (name) item.name = name;
        if (description) item.description = description;
        if (category) item.category = category;
        if (photos) item.photos = photos;
        if (isActive !== undefined) item.isActive = isActive;

        await item.save(); // Сохранение обновленных данных в базе данных

        // Возврат успешного ответа с обновленными данными предмета
        return res.status(201).json({
            id: item.id,
            name: item.name,
            description: item.description,
            category: item.category,
            photos: item.photos,
            isActive: item.isActive,
            updatedAt: item.updatedAt // Поле updatedAt добавлено для указания времени последнего обновления
        });

    } catch (error) {
        console.error('Ошибка при обновлении предмета:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Функция удаления предмета
export const deleteItem = async (req, res) => {
    const itemId = req.params.id; // Получение ID предмета из URL

    try {
        // Проверка, существует ли предмет с указанным itemId
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Предмет не найден' });
        }

        // Проверка, может ли текущий пользователь изменять данный предмет
        if (item.authorId !== req.user.user_id) {
            return res.status(403).json({ error: 'Нет разрешения на изменение этого предмета' });
        }   

        // Удаление предмета
        await item.destroy();

        // Возврат успешного ответа об удалении
        return res.status(204).json();

    } catch (error) {
        console.error('Ошибка при удалении предмета:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Функция для получения предметов текущего пользователя
export const myItems = async (req, res) => {
    const userId = req.user.user_id; // Получение ID текущего пользователя из токена

    try {
        // Поиск всех предметов, созданных текущим пользователем
        const items = await Item.findAll({
            where: {
                authorId: userId
            },
            attributes: ['id', 'name', 'description', 'category', 'photos', 'isActive', 'createdAt'],
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                }
            ]
        });

        // Возврат найденных предметов в ответе
        return res.status(200).json(items);

    } catch (error) {
        console.error('Ошибка при получении предметов пользователя:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Функция для получения предметов другого пользователя
export const otherUserItems = async (req, res) => {
    const userId = req.params.id; // Получение ID другого пользователя из URL
    console.log(userId)

    try {

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Такого пользователя не существует' });
        }

        // Поиск всех предметов, созданных указанным пользователем
        const items = await Item.findAll({
            where: {
                authorId: userId,
                isActive: true
            },
            attributes: ['id', 'name', 'description', 'category', 'photos', 'isActive', 'createdAt'],
            include: [
                {
                    model: User, // Модель User, связанная с Item через authorId
                    attributes: ['firstName', 'lastName']
                }
            ]
        });

        // Возврат найденных предметов в ответе
        return res.status(200).json(items);

    } catch (error) {
        console.error('Ошибка при получении предметов другого пользователя:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};