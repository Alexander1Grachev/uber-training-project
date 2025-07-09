//тестим круды
import request from 'supertest';
import express from 'express';
import { setupApp } from '../src/setup-app';
import { DriverInputDto } from '../src/drivers/dto/driver.input-dto';

import { HttpStatus } from '../src/core/const/http-statuses';

describe('Driver API', () => {
  const app = express();
  setupApp(app);
  const testDriverData: DriverInputDto = {
    name: 'Valentin',
    phoneNumber: '123-456-7890',
    email: 'valentin@example.com',
    vehicleMake: 'BMW',
    vehicleModel: 'X5',
    vehicleYear: 2021,
    vehicleLicensePlate: 'ABC-123',
    vehicleDescription: null,
    vehicleFeatures: [],
  };

  beforeAll(async () => {
    await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
  });

  it('Should return 200 - GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world!');
  });

  it('should create driver; POST /drivers', async () => {
    // → Тест создания водителя
    const newDriver: DriverInputDto = {
      // → Данные для запроса (дублирование для наглядности)
      ...testDriverData,
      name: 'Valentin',
      phoneNumber: '123-456-7890',
      email: 'valentin@example.com',
    };

    await request(app)
      .post('/drivers') // → POST-запрос на создание
      .send(newDriver) // → Отправка данных
      .expect(201); // → Ожидаем статус 201 (Created)
  });

  it('should return drivers list; GET /drivers', async () => {
    // → Тест получения списка
    await request(app) // → Создаем первого водителя
      .post('/drivers')
      .send({ ...testDriverData, name: 'Another Driver' })
      .expect(201);

    await request(app) // → Создаем второго водителя
      .post('/drivers')
      .send({ ...testDriverData, name: 'Another Driver2' })
      .expect(201);

    const driverListResponse = await request(app) // → GET-запрос на получение списка
      .get('/drivers')
      .expect(200); // → Ожидаем статус 200 (OK)

    expect(driverListResponse.body).toBeInstanceOf(Array); // → Проверяем, что ответ — массив
    expect(driverListResponse.body.length).toBeGreaterThanOrEqual(2); // → Должно быть ≥2 водителей
  });

  it('should return driver by id; GET /drivers/:id', async () => {
    // → Тест получения по ID
    const createResponse = await request(app) // → Сначала создаем водителя
      .post('/drivers')
      .send({ ...testDriverData, name: 'Another Driver' })
      .expect(201);

    const getResponse = await request(app) // → Запрашиваем его по ID
      .get(`/drivers/${createResponse.body.id}`) // → ID берем из ответа при создании
      .expect(200);

    expect(getResponse.body).toEqual({
      // → Проверяем полное соответствие данных
      ...createResponse.body, // → Все поля из создания
      id: expect.any(Number), // → ID должен быть числом
      createdAt: expect.any(String), // → Дата создания — строка
    });
  });
});
