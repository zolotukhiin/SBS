import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import User from './userModel.js';
import Item from './itemModel.js';
import Offer from './offerModel.js';

class Exchange extends Model {}

Exchange.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        requesterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        requesterItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Item,
                key: 'id',
            },
        },
        offerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Offer,
                key: 'id',
            },
        },
        offerOwnerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        offerOwnerItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Item,
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('no answer', 'exchange completed', 'exchange failed', 'offer expired'),
            allowNull: false,
            defaultValue: 'no answer',
        },
    },
    {
        sequelize,
        modelName: 'Exchange',
        tableName: 'exchanges',
        timestamps: true,
    }
);

// Настройка связей
Exchange.belongsTo(User, { as: 'requester', foreignKey: 'requesterId' });
Exchange.belongsTo(Item, { as: 'requesterItem', foreignKey: 'requesterItemId' });
Exchange.belongsTo(Offer, { foreignKey: 'offerId' });
Exchange.belongsTo(User, { as: 'offerOwner', foreignKey: 'offerOwnerId' });
Exchange.belongsTo(Item, { as: 'offerOwnerItem', foreignKey: 'offerOwnerItemId' });

export default Exchange;