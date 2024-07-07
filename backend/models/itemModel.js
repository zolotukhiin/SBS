import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';
import User from '../models/userModel.js'; // Импорт модели User

class Item extends Model {}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photos: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Item',
        tableName: 'items',
        timestamps: false, // createdAt включено вручную
    }
);

// Устанавливаем связи
Item.belongsTo(User, { foreignKey: 'authorId' });
User.hasMany(Item, { foreignKey: 'authorId' });

export default Item;