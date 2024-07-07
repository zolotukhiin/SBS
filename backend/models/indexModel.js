import { Sequelize } from 'sequelize';
import initUserModel from './userModel.js';
import initItemModel from './itemModel.js';

// Создаем экземпляр Sequelize для подключения к базе данных PostgreSQL
const sequelize = new Sequelize('sbs_db', 'zolotukhin_d', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});

// Регистрация моделей
const User = initUserModel(sequelize);
const Item = initItemModel(sequelize);

// Экспортируем экземпляр Sequelize и модели
export { sequelize, User, Item };