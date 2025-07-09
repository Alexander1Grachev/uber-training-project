import express from 'express'; // Создает экземпляр Express-приложения
import { setupApp } from './setup-app';

// создание приложения
const app = express();
setupApp(app); // Передает приложение в функцию настройки

// порт приложения
const PORT = process.env.PORT || 5001;

// запуск приложения
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

/* Создается "чистое" Express-приложение
Это ядро моего сервера, пока без роутов и middleware 
*/
