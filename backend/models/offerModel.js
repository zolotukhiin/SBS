import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import User from './userModel.js';
import Item from './itemModel.js';

class Offer extends Model {}

Offer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Item,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'active', // 'active', 'completed', 'rejected'
        },
    },
    {
        sequelize,
        modelName: 'Offer',
        tableName: 'offers',
    }
);

// Настройка связей
Offer.belongsTo(User, { foreignKey: 'userId' });
Offer.belongsTo(Item, { foreignKey: 'itemId' });

export default Offer;