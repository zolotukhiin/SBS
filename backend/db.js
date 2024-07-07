import { Sequelize } from 'sequelize';

// Создаем экземпляр Sequelize для подключения к базе данных PostgreSQL
const sequelize = new Sequelize('sbs_db', 'zolotukhin_d', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});


// Проверка подключения к базе данных
sequelize
    .authenticate()
    .then(() => console.log('База данных подключена.'))
    .catch((err) => console.error('Ошибка подключения к базе данных: ', err));

// Экспортируем sequelize как экспорт по умолчанию
export default sequelize;