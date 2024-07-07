import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

// Определение модели пользователя
class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false, // createdAt включено вручную, поэтому timestamps отключены
    }
);

// // Синхронизация модели с базой данных
// async function syncDB() {
//     try {
//         await sequelize.authenticate(); // Проверка соединения с базой данных
//         console.log('Connection has been established successfully.');
//         await sequelize.sync({ alter: true });
//         console.log('Database synced.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// syncDB();

export default User;