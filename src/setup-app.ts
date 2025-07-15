// Собирает роуты
import express, { Express, Request, Response } from 'express';
import { db } from './db/in-memory.db';
import { Driver } from './drivers/types/driver';
import { HttpStatus } from './core/const/http-statuses';
import { testingRouter } from './testing/router/testing.routers';
import { driversRouter } from './drivers/router/drivers.router';
import { setupSwagger } from './core/swagger/setup-swagger';
import { TESTING_PATH, DRIVERS_PATH } from './core/paths/paths';
export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON

  // регистрируем роуты
  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.use(DRIVERS_PATH, driversRouter);
  app.use(TESTING_PATH, testingRouter);
  setupSwagger(app);
  return app; // Возвращает настроенное приложение
};
