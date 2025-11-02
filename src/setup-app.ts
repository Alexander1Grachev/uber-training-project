// Собирает роуты
import express, { Express } from 'express';
import { testingRouter } from './testing/routes/testing.route';
import { driversRouter } from './drivers/routes/drivers.router';
import { setupSwagger } from './core/swagger/setup-swagger';
import { TESTING_PATH, DRIVERS_PATH, RIDES_PATH } from './core/paths/paths';
import { ridesRoute } from './rides/routes/rides.route';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use(DRIVERS_PATH, driversRouter);
  app.use(RIDES_PATH, ridesRoute);
  app.use(TESTING_PATH, testingRouter);

  setupSwagger(app);

  return app;
};
