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

// delete exchange
export const deleteExchange = async (req, res) => {
    const exchangeId = req.params.id;
    const userId = req.user.user_id;
    console.log(userId)

    try {
        const exchange = await Exchange.findByPk(exchangeId);
        if (!exchange) {
            return res.status(404).json({error: 'Такого обмена не существует'})
        }

        if (exchange.requesterId != userId){
            return res.status(404).json({error: 'У вас нет права на удаление этого обмена'})
        }

        await exchange.destroy();
        return res.status(204).json();

    } catch (error) {
        console.error('Ошибка при удалении обмена:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    };
};

// get my creating exchanges
export const getMyCreatedExchanges = async (req, res) => {
    const userId = req.user.user_id;

    try {
        const exchanges = await Exchange.findAll({
            where: {
                requesterId: userId
            },
        });

        res.status(200).json(exchanges);
    } catch (error) {
        console.error('Ошибка при получении созданных обменов:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    };
};

// get exchanges for me
export const getExchangesForMe = async (req, res) => {
    const userId = req.user.user_id;

    try {
        const exchanges = await Exchange.findAll({
            where: {
                offerOwnerId: userId
            },
        });

        res.status(200).json(exchanges);
    } catch (error) {
        console.error('Ошибка при получении обменов:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    };
};

// answer to exchange 
export const createSolutionToExchange = async (req, res) => {
    const userId = req.user.user_id;
    const exchangeId = req.params.id;
    const solution = req.body.solution;

    try {
        const exchange = await Exchange.findByPk(exchangeId);
        const offer = await Offer.findByPk(exchange.offerId);
        // предмет создателя обмена
        const requesterItem = await Item.findOne({
            where: {
                authorId: exchange.requesterId,
                id: exchange.requesterItemId
            },
        });

        // предмет создателя офера
        const offerItem = await Item.findOne({
            where: {
                authorId: exchange.offerOwnerId,
                id: exchange.offerOwnerItemId
            },
        });

        if (!exchange) {
            return res.status(404).json({error: 'Такого обмена не существует'});
        };

        if (userId != exchange.offerOwnerId) {
            return res.status(404).json({error: 'У вас нет прав на изменение'});
        };

        if (!offer) {
            return res.status(404).json({error: 'Такого предложения по обмену нет'});
        };

        if (!requesterItem || !offerItem) {
            return res.status(404).json({error: 'Такого предмета не существует'});
        };

        if (solution == 'true') {
            exchange.status = 'completed';
            offer.status = 'completed';
            
            requesterItem.authorId = exchange.offerOwnerId;
            offerItem.authorId = exchange.requesterId;

            await requesterItem.save();
            await offerItem.save();

            return res.status(201).json({
                offer: offer,
                exchange: exchange
            });

        } else if (solution == 'false') {
            exchange.status = 'rejected';
            offer.status = 'rejected';
            return res.status(201).json({
                offer: offer,
                exchange: exchange
            });
        } else {
            return res.status(404).json({error: 'Некорректный запрос'});
        }
    } catch (error) {
        console.error('Ошибка при получении обменов:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    };

};