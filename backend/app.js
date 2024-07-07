// Импортируем модуль express
import express from 'express';
import syncDB from './db/sync.js';
syncDB();

// Импортируем маршруты 
import userRoutes from './routes/user.routes.js';
import itemRoutes from './routes/item.routes.js';

// Создаем экземпляр приложения Express
const app = express();

// Устанавливаем порт, на котором будет работать сервер. Используем переменную окружения PORT или значение по умолчанию 3000
const PORT = process.env.PORT || 3000;

// Добавляем middleware для автоматического преобразования JSON-запросов в объекты JavaScript
app.use(express.json());

// Подключаем маршруты
app.use('/api', userRoutes, itemRoutes);

// Определяем маршрут для корневого URL ('/') и возвращаем сообщение
app.get('/', (req, res) => {
  res.send('Welcome to SBS API');
});

// Запускаем сервер на указанном порту и выводим сообщение в консоль
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту - ${PORT}`);
});