import Item from "../models/itemModel.js";
import Offer from "../models/offerModel.js";
import User from "../models/userModel.js";

// Создание предложения обмена
export const createOffer = async (req, res) => {
    const { itemId, duration } = req.body;
    const userId = req.user.user_id; // Получение ID текущего пользователя из токена

    // Установка срока действия предложения
    const dateNow = new Date();
    const expirationDate = new Date(dateNow.setDate(dateNow.getDate() + duration)); // duration в днях

    try {
        // Проверка, принадлежит ли предмет пользователю
        const item = await Item.findByPk(itemId);
        if (!item || item.authorId !== userId) {
            return res.status(404).json({ error: 'Предмет не найден или не принадлежит пользователю' });
        }

        // Создание нового предложения обмена
        const offer = await Offer.create({
            itemId,
            userId,
            expirationDate: expirationDate.toISOString(), // Сохраняем в ISO формате
            status: 'active', // Пример добавления статуса
        });

        // Форматирование даты перед отправкой ответа клиенту
        const expDate = expirationDate.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        return res.status(201).json({
            id: offer.id,
            itemId: offer.itemId,
            userId: offer.userId,
            expirationDate: expDate,
            status: offer.status
        });
    } catch (error) {
        console.error('Ошибка при создании предложения обмена:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Получение всех предложений обмена
export const getOffers = async (req, res) => {
    try {
        const offers = await Offer.findAll({
            where: {
                status: "active",
            },
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Item,
                    attributes: ['name']
                }
            ]
        });

        return res.status(200).json(offers);
    } catch (error) {
        console.error('Ошибка при получении предложения обмена:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    };
};

// Получение всех предложений обмена конкретного пользователя
export const getOffersByUser = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const offers = await Offer.findAll({
            where: {
                userId: userId,
                status: "active",
            },
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Item,
                    attributes: ['name']
                }
            ]
        });

        return res.status(200).json(offers);
    } catch (error) {
        console.error('Ошибка при получении предложений обмена данного пользователя:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    };
};

// Получение сосбвтенных предложений для обмена 
export const myOffers = async (req, res) => {
    const userId = req.user.user_id; // Получение ID текущего пользователя из токена

    try {
        const offers = await Offer.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Item,
                    attributes: ['name']
                }
            ]
        });

        return res.status(200).json(offers);
    } catch (error) {
        console.error('Ошибка при получении предложений обмена текущего пользователя:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Обновление времени жизни предложения
export const updateOffer = async (req, res) => {
    const offerId = req.params.id; // Получение ID предложения из URL
    const { duration } = req.body;

    try {
        // Проверка, существует ли предмет с указанным itemId
        const offer = await Offer.findByPk(offerId);
        if (!offer) {
            return res.status(404).json({ error: 'Предложение не найдено' });
        }

        console.log(req.user.user_id, offer.authorId)
        // Проверка, может ли текущий пользователь изменять данный предмет
        if (offer.userId != req.user.user_id) {
            return res.status(403).json({ error: 'Нет разрешения на изменение этого предложения' });
        }

        // Установка срока действия предложения
        const dateNow = new Date();
        const expirationDate = new Date(dateNow.setDate(dateNow.getDate() + duration)); // duration в днях

        // Форматирование даты перед отправкой ответа клиенту
        const expDate = expirationDate.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        // Обновление данных предложения (только для тех полей, которые были отправлены в запросе)
        if (duration) offer.expirationDate = expDate;

        await offer.save(); // Сохранение обновленных данных в базе данных

        return res.status(201).json({
            id: offer.id,
            itemId: offer.itemId,
            userId: offer.userId,
            expirationDate: expDate,
            status: offer.status
        });
    } catch (error) {
        console.error('Ошибка при обновлении предложения обмена:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Удаление предложения 
export const deleteOffer = async (req, res) => {
    const offerId = req.params.id;

    try {
        // Проверка, существует ли предложение с указанным offerId
        const offer = await Offer.findByPk(offerId);
        if (!offer) {
            return res.status(404).json({ error: 'Предложение не найдено' });
        }

        // Проверка, может ли текущий пользователь изменять данный предмет
        if (offer.userId !== req.user.user_id) {
            return res.status(403).json({ error: 'Нет разрешения на удаление этого предложения' });
        }   

        // Удаление предмета
        await offer.destroy();

        return res.status(204).json();
    } catch (error) {
        console.error('Ошибка при удалении предложения:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    };
};