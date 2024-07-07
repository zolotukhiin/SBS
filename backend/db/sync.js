import sequelize from '../db.js'; // Импорт sequelize из конфигурационного файла

async function syncDB() {
    try {
        await sequelize.authenticate(); // Проверка соединения с базой данных
        console.log('Cоединение успешно установлено!');
        await sequelize.sync({ alter: true }); // Синхронизация моделей с базой данных
        console.log('База данных синхронизирована.');
    } catch (error) {
        console.error('Не удалось подключиться к БД:', error);
    }
}

export default syncDB;