// Собирает роуты
import express, { Express, Request, Response } from 'express';
import { db } from './db/in-memory.db';
import { Driver } from './drivers/types/driver';
import { HttpStatus } from './core/const/http-statuses';
import { testingRouter } from './testing/testing.routers';
import { driversRouter } from './drivers/router/drivers.router';
export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON

  // регистрируем роуты
  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.use('/drivers', driversRouter);
  app.use('/testing', testingRouter);
  return app; // Возвращает настроенное приложение
};
