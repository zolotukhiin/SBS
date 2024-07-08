import Offer from '../models/offerModel.js';
import Item from '../models/itemModel.js';
import Exchange from '../models/exchangeModel.js';
import User from '../models/userModel.js';

// create exchange
export const createExchange = async (req, res) => {
    const offerId = req.body.offer;
    const itemId = req.body.item;
    const requesterId = req.user.user_id;

    try {
        const offer = await Offer.findByPk(offerId);
        const item = await Item.findByPk(itemId);
        const requester = await User.findByPk(requesterId);

        if (!offer) {
            return res.status(404).json({ error: 'Такого предложения по обмену не найдено' });
        };

        if (!item) {
            return res.status(404).json({ error: 'Такого предмета не найдено' });
        } else if(item.authorId != requesterId) {
            return res.status(404).json({ error: 'У вас нет доступа к этому предмету' });
        };

        if (!requester) {
            return res.status(404).json({ error: 'Доступно только авторизованным пользователям' });
        }

        const exchange = await Exchange.create({
            requesterId: requesterId, 
            requesterItemId: itemId, 
            offerId: offerId,
            offerOwnerId: offer.userId,
            offerOwnerItemId: offer.itemId,
            status: 'no answer'
        });


        return res.status(201).json(exchange);
    } catch (error) {
        console.error('Ошибка при создании обмена:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// update exchange 
export const updateExchange = async (req, res) => {
    const exchangeId = req.params.id;
    const itemId = req.body.item;
    const requesterId = req.user.user_id;

    try {
        const item = await Item.findByPk(itemId);
        const requester = await User.findByPk(requesterId);
        const exchange = await Exchange.findByPk(exchangeId);

        if (!exchange) {
            return res.status(404).json({ error: 'Такого обмена не найдено' });
        } else if (exchange.requesterId != requesterId) {
            console.log(exchange.requesterId, requesterId)
            return res.status(404).json({ error: 'У вас нет доступа к этому обмену' });
        };

        if (!item) {
            return res.status(404).json({ error: 'Такого предмета не найдено' });
        } else if(item.authorId != requesterId) {
            return res.status(404).json({ error: 'У вас нет доступа к этому предмету' });
        };

        exchange.requesterItemId = itemId;
        await exchange.save();

        return res.status(201).json(exchange);
    } catch (error) {
        console.error('Ошибка при изменении обмена:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};